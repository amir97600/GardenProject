package projet_jardin;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import projet_jardin.rest.request.CultureRequest;
import projet_jardin.rest.request.CultureRequest.PlanteType;
import projet_jardin.rest.response.CultureResponse;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@Transactional 
@Rollback
@ActiveProfiles("test")
public class TestCulture {

	@Autowired
	private TestRestTemplate template;


	@Test
	public void createWithRestTemplate() throws Exception {
		// ARRANGE
		CultureRequest cultureRequest = new CultureRequest();
		cultureRequest.setDateDernierArrosage(LocalDate.parse("2025-04-18"));
		cultureRequest.setDatePlantation(LocalDate.parse("2025-04-18"));
		cultureRequest.setIdJardin(1);
		cultureRequest.setIdPlante(1);
		cultureRequest.setQuantite(20);
		cultureRequest.setRecolte(false);
		cultureRequest.setPlanteType(PlanteType.valueOf("FLEUR"));

		// ACT
		ResponseEntity<CultureResponse> cultureResponse = template.postForEntity("/api/culture", cultureRequest, CultureResponse.class);

		// ASSERT
		assertEquals(HttpStatus.FORBIDDEN, cultureResponse.getStatusCode());
		assertEquals(MediaType.APPLICATION_JSON, cultureResponse.getHeaders().getContentType());
		assertNotNull(cultureResponse.getBody());
		/*assertEquals(cultureResponse.getBody().getQuantite(),20);
		assertEquals(cultureResponse.getBody().getDatePlantation(),LocalDate.parse("2025-04-18"));
		assertEquals(cultureResponse.getBody().getDateDernierArrosage(),LocalDate.parse("2025-04-18"));
		assertEquals(cultureResponse.getBody().getIdJardin(),1);
		assertEquals(cultureResponse.getBody().getIdPlante(),1);
		assertEquals(cultureResponse.getBody().getRecolte(),false);*/

	}
}
