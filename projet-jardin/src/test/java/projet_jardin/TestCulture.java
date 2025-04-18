package projet_jardin;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.time.LocalDate;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import projet_jardin.model.Culture;
import projet_jardin.rest.request.CultureRequest;
import projet_jardin.rest.request.CultureRequest.PlanteType;
import projet_jardin.rest.response.CultureResponse;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@Transactional 
@Rollback
public class TestCulture {

	@Autowired
	private WebApplicationContext applicationContext;
	private MockMvc mockMvc;
	
	 @Autowired
	 private TestRestTemplate template;
	   

	@BeforeEach
	public void init(){
		this.mockMvc = MockMvcBuilders
				.webAppContextSetup(applicationContext)
				.build();
	}
	
	/*
	@Test
	public void createCulture()  throws Exception {
		// ARRANGE
		StringBuilder culture = new StringBuilder();
		culture.append("{").append("\"quantite\"").append(":").append("\"20\"").append(",");
		culture.append("\"datePlantation\"").append(":").append("\"2025-01-01\"").append(",");
		culture.append("\"dateDernierArrosage\"").append(":").append("\"2025-04-18\"").append(",");
		culture.append("\"recolte\"").append(":").append("\"false\"").append(",");
		culture.append("\"idJardin\"").append(":").append("1").append(",");
		culture.append("\"idPlante\"").append(":").append("1").append(",");
		culture.append("\"planteType\"").append(":").append("\"Fleur\"").append("}");

		// ACT & ASSERT
		this.mockMvc.perform(MockMvcRequestBuilders.post("/culture").contentType(MediaType.APPLICATION_JSON)
				.content(culture.toString()))
		.andExpect(MockMvcResultMatchers.status().isOk())
		.andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
		.andExpect(MockMvcResultMatchers.jsonPath("$").exists())
		.andExpect(MockMvcResultMatchers.jsonPath("$.id").isNotEmpty())
		.andExpect(MockMvcResultMatchers.jsonPath("$.quantite").value("20"))
		.andExpect(MockMvcResultMatchers.jsonPath("$.datePlantation").value("2025-01-01"))
		.andExpect(MockMvcResultMatchers.jsonPath("$.dateDernierArrosage").value("2025-04-18"))
		.andExpect(MockMvcResultMatchers.jsonPath("$.recolte").value("false"))
		.andExpect(MockMvcResultMatchers.jsonPath("$.jardin.numero").value("1"))
		.andExpect(MockMvcResultMatchers.jsonPath("$.plante.id").value("1"));


	}
	*/
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
