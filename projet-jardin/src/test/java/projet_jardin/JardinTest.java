package projet_jardin;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import projet_jardin.dao.IDAOJardin;
import projet_jardin.model.Jardin;

@SpringBootTest
@Transactional
@Rollback(true)
public class JardinTest {

	@Autowired
	private WebApplicationContext applicationContext;
	private MockMvc mockMvc;
	
	@Autowired
	private IDAOJardin daoJardin;
	
//	@Test
//	public void findByIdJardin() {
//		//Arrange
//		Jardin jardin = new Jardin("Lieu","Nom",10);
//		jardin = daoJardin.save(jardin);
//		
//		//Act
//		Optional<Jardin> jardinTrouve = daoJardin.findById(jardin.getNumero());
//		
//		//Assert
//		assertEquals(jardin.getNumero(),jardinTrouve.get().getNumero());
//		assertEquals(jardin.getLieu(),jardinTrouve.get().getLieu());
//		assertEquals(jardin.getNom(),jardinTrouve.get().getNom());
//		
//	}
	
	@BeforeEach
    public void init(){
        this.mockMvc = MockMvcBuilders
                .webAppContextSetup(applicationContext)
                .build();
	}
	
	@Test
	public void findByIDOk() throws Exception {
		//Arrange
		Jardin jardin = new Jardin("Nom", "Lieu", 10);
		jardin = daoJardin.save(jardin);
		
		//Act
	    mockMvc.perform(MockMvcRequestBuilders.get("/jardin/{numero}", jardin.getNumero()))
	            .andExpect(MockMvcResultMatchers.status().isOk())
	            .andExpect(MockMvcResultMatchers.jsonPath("$.numero").value(jardin.getNumero()))
	            .andExpect(MockMvcResultMatchers.jsonPath("$.lieu").value("Lieu"))
	            .andExpect(MockMvcResultMatchers.jsonPath("$.nom").value("Nom"))
	            .andExpect(MockMvcResultMatchers.jsonPath("$.superficie").value(10));
		
		
	}
	
}
