package projet_jardin;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import projet_jardin.model.Culture;
import projet_jardin.rest.request.CultureRequest;
import projet_jardin.rest.request.CultureRequest.PlanteType;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@Transactional 
@Rollback
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
		cultureRequest.setPlanteType(PlanteType.valueOf("Fleur"));;

		// ACT
		ResponseEntity<Culture> cultureResponse = template.postForEntity("/culture", cultureRequest, Culture.class);

		// ASSERT
		assertEquals(HttpStatus.OK, cultureResponse.getStatusCode());
		assertEquals(MediaType.APPLICATION_JSON, cultureResponse.getHeaders().getContentType());
		assertNotNull(cultureResponse.getBody());
		assertNotNull(cultureResponse.getBody().getId());
		assertEquals(cultureResponse.getBody().getQuantite(),20);
		assertEquals(cultureResponse.getBody().getDatePlantation(),LocalDate.parse("2025-04-18"));
		assertEquals(cultureResponse.getBody().getDateDernierArrosage(),LocalDate.parse("2025-04-18"));
		assertEquals(cultureResponse.getBody().getJardin().getNumero(),1);
		assertEquals(cultureResponse.getBody().getPlante().getId(),1);
		assertEquals(cultureResponse.getBody().getRecolte(),false);

	}
}
