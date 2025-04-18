package projet_jardin.rest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.Rollback;
import org.springframework.web.context.WebApplicationContext;

import jakarta.transaction.Transactional;
import projet_jardin.dao.IDAOUtilisateur;
import projet_jardin.model.Admin;
import projet_jardin.model.Client;
import projet_jardin.rest.request.AdminRequest;
import projet_jardin.rest.request.ClientRequest;
import projet_jardin.rest.response.AdminResponse;
import projet_jardin.rest.response.ClientResponse;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@Transactional
@Rollback
public class RestUtilisateurTests {
	
	@Autowired
    private WebApplicationContext applicationContext;
    
    @Autowired
    private TestRestTemplate template;
    
   /* @Test
	public void getClientByIdRest() throws Exception {
		// ARRANGE
		Integer id = 2;

		// ACT
		ResponseEntity<ClientResponse> clientResponse = template.getForEntity("/utilisateurs/clients/{id}", ClientResponse.class,id);
		
		// ASSERT
		assertEquals(HttpStatus.OK, clientResponse.getStatusCode());
		assertEquals(MediaType.APPLICATION_JSON, clientResponse.getHeaders().getContentType());
		assertNotNull(clientResponse.getBody());
		assertEquals(clientResponse.getBody().getLogin(),"log1");
		assertEquals(clientResponse.getBody().getPassword(),"pass1");
		assertEquals(clientResponse.getBody().getNom(),"alpha");
		
		System.out.println("Test /utilisateurs/clients ok");
	}*/
    
 // -----------------------------
    // CLIENTS - REST
    // -----------------------------

    @Test
    public void getClientByIdRest() {
        // ARRANGE
        Integer id = 3;

        // ACT
        ResponseEntity<ClientResponse> response = template.getForEntity("/utilisateurs/clients/{id}", ClientResponse.class, id);

        // ASSERT
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(MediaType.APPLICATION_JSON, response.getHeaders().getContentType());
        assertNotNull(response.getBody());
        assertEquals("updatedLogin", response.getBody().getLogin());
        assertEquals("updatedPass", response.getBody().getPassword());
        assertEquals("updatedNom", response.getBody().getNom());

        System.out.println("Test GET /utilisateurs/clients/{id} OK");
    }

    @Test
    public void getAllClientsRest() {
        // ACT
        ResponseEntity<ClientResponse[]> response = template.getForEntity("/utilisateurs/clients", ClientResponse[].class);

        // ASSERT
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().length > 0);

        System.out.println("Test GET /utilisateurs/clients OK");
    }

    @Test
    public void createClientRest() {
        // ARRANGE
        ClientRequest request = new ClientRequest();
        request.setLogin("clientTest");
        request.setPassword("test123");
        request.setNom("Client Nom");

        // ACT
        ResponseEntity<Client> response = template.postForEntity("/utilisateurs/clients", request, Client.class);

        // ASSERT
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("clientTest", response.getBody().getLogin());

        System.out.println("Test POST /utilisateurs/clients OK");
    }

    @Test
    public void updateClientRest() {
        // ARRANGE
        Integer id = 3;
        ClientRequest request = new ClientRequest();
        request.setId(id);
        request.setLogin("updatedLogin");
        request.setPassword("updatedPass");
        request.setNom("updatedNom");

        HttpEntity<ClientRequest> entity = new HttpEntity<>(request);

        // ACT
        ResponseEntity<Client> response = template.exchange("/utilisateurs/clients/{id}", HttpMethod.PUT, entity, Client.class, id);

        // ASSERT
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("updatedLogin", response.getBody().getLogin());

        System.out.println("Test PUT /utilisateurs/clients/{id} OK");
    }
    

    // -----------------------------
    // ADMINS - REST
    // -----------------------------

    @Test
    public void getAdminByIdRest() {
        // ARRANGE
        Integer id = 8;

        // ACT
        ResponseEntity<AdminResponse> response = template.getForEntity("/utilisateurs/admins/{id}", AdminResponse.class, id);

        // ASSERT
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(MediaType.APPLICATION_JSON, response.getHeaders().getContentType());
        assertNotNull(response.getBody());
        assertEquals("adminTest", response.getBody().getLogin());

        System.out.println("Test GET /utilisateurs/admins/{id} OK");
    }

    @Test
    public void getAllAdminsRest() {
        // ACT
        ResponseEntity<AdminResponse[]> response = template.getForEntity("/utilisateurs/admins", AdminResponse[].class);

        // ASSERT
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().length > 0);

        System.out.println("Test GET /utilisateurs/admins OK");
    }

    @Test
    public void createAdminRest() {
        // ARRANGE
        AdminRequest request = new AdminRequest();
        request.setLogin("adminTest");
        request.setPassword("admin123");

        // ACT
        ResponseEntity<Admin> response = template.postForEntity("/utilisateurs/admins", request, Admin.class);

        // ASSERT
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("adminTest", response.getBody().getLogin());

        System.out.println("Test POST /utilisateurs/admins OK");
    }

    @Test
    public void updateAdminRest() {
        // ARRANGE
        Integer id = 11;
        AdminRequest request = new AdminRequest();
        request.setId(id);
        request.setLogin("updatedAdmin");
        request.setPassword("updatedPass");

        HttpEntity<AdminRequest> entity = new HttpEntity<>(request);

        // ACT
        ResponseEntity<Admin> response = template.exchange("/utilisateurs/admins/{id}", HttpMethod.PUT, entity, Admin.class, id);

        // ASSERT
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("updatedAdmin", response.getBody().getLogin());

        System.out.println("Test PUT /utilisateurs/admins/{id} OK");
    }

    // -----------------------------
    // DELETE COMMUN
    // -----------------------------

    @Test
    public void deleteUtilisateurRest() {
        // ARRANGE
        ClientRequest request = new ClientRequest();
        request.setLogin("todelete");
        request.setPassword("pass");
        request.setNom("nom");

        ResponseEntity<Client> createResponse = template.postForEntity("/utilisateurs/clients", request, Client.class);
        Integer id = createResponse.getBody().getId();

        // ACT
        ResponseEntity<Void> deleteResponse = template.exchange("/utilisateurs/{id}", HttpMethod.DELETE, null, Void.class, id);

        // ASSERT
        assertEquals(HttpStatus.OK, deleteResponse.getStatusCode());

        System.out.println("Test DELETE /utilisateurs/{id} OK");
    }
}
    
	
	
