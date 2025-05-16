
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

    @Test
    public void getClientByIdRest() {
        // ARRANGE
        ClientRequest createRequest = new ClientRequest();
        createRequest.setLogin("clientTest");
        createRequest.setPassword("client123");
        createRequest.setNom("Client Nom");
    
        ResponseEntity<Client> createResponse = template.postForEntity("/api/utilisateur/client", createRequest, Client.class);
        Integer createdClientId = createResponse.getBody().getId();

        // ACT
        ResponseEntity<ClientResponse> response = template.getForEntity("/api/utilisateur/client/{id}", ClientResponse.class, createdClientId);

        // ASSERT
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("clientTest", response.getBody().getLogin());
        assertEquals("client123", response.getBody().getPassword());
        assertEquals("Client Nom", response.getBody().getNom());
    }

    @Test
    public void getAllClientsRest() {
        // ACT
        ResponseEntity<ClientResponse[]> response = template.getForEntity("/api/utilisateur/client", ClientResponse[].class);

        // ASSERT
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().length > 0);

        System.out.println("Test GET /api/utilisateur/client OK");
    }

    @Test
    public void createClientRest() {
        // ARRANGE
        ClientRequest request = new ClientRequest();
        request.setLogin("clientTest");
        request.setPassword("test123");
        request.setNom("Client Nom");

        // ACT
        ResponseEntity<Client> response = template.postForEntity("/api/utilisateur/client", request, Client.class);

        // ASSERT
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("clientTest", response.getBody().getLogin());

        System.out.println("Test POST /api/utilisateur/client OK");
    }

    @Test
    public void updateClientRest() {
        // ARRANGE
        ClientRequest createRequest = new ClientRequest();
        createRequest.setLogin("clientTest");
        createRequest.setPassword("client123");
        createRequest.setNom("Client Nom");
    
        ResponseEntity<Client> createResponse = template.postForEntity("/api/utilisateur/client", createRequest, Client.class);
        Integer createdClientId = createResponse.getBody().getId();

        ClientRequest updateRequest = new ClientRequest();
        updateRequest.setId(createdClientId);
        updateRequest.setLogin("updatedClient");
        updateRequest.setPassword("updatedPass");
        updateRequest.setNom("Updated Nom");

        HttpEntity<ClientRequest> entity = new HttpEntity<>(updateRequest);

        // ACT
        ResponseEntity<Client> response = template.exchange("/api/utilisateur/client/{id}", HttpMethod.PUT, entity, Client.class, createdClientId);

        // ASSERT
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("updatedClient", response.getBody().getLogin());
        assertEquals("updatedPass", response.getBody().getPassword());
        assertEquals("Updated Nom", response.getBody().getNom());
    }

    // -----------------------------
    // ADMINS - REST
    // -----------------------------
    @Test
    public void getAdminByIdRest() {
        // ARRANGE
        AdminRequest adminRequest = new AdminRequest();
        adminRequest.setLogin("adminTest");
        adminRequest.setPassword("admin123");

        ResponseEntity<Admin> createResponse = template.postForEntity("/api/utilisateur/admin", adminRequest, Admin.class);
        assertEquals(HttpStatus.OK, createResponse.getStatusCode());
        assertNotNull(createResponse.getBody());
        Integer createdAdminId = createResponse.getBody().getId();

        // ACT
        ResponseEntity<AdminResponse> response = template.getForEntity("/api/utilisateur/admin/{id}", AdminResponse.class, createdAdminId);

        // ASSERT
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(MediaType.APPLICATION_JSON, response.getHeaders().getContentType());
        assertNotNull(response.getBody());
        assertEquals("adminTest", response.getBody().getLogin());

        System.out.println("Test GET /api/utilisateur/admin/{id} OK");
    }

    @Test
    public void getAllAdminsRest() {
        // ACT
        ResponseEntity<AdminResponse[]> response = template.getForEntity("/api/utilisateur/admin", AdminResponse[].class);

        // ASSERT
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().length > 0);

        System.out.println("Test GET /api/utilisateur/admin OK");
    }

    @Test
    public void createAdminRest() {
        // ARRANGE
        AdminRequest request = new AdminRequest();
        request.setLogin("adminTest");
        request.setPassword("admin123");

        // ACT
        ResponseEntity<Admin> response = template.postForEntity("/api/utilisateur/admin", request, Admin.class);

        // ASSERT
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("adminTest", response.getBody().getLogin());

        System.out.println("Test POST /api/utilisateur/admin OK");
    }

    @Test
    public void updateAdminRest() {
        // ARRANGE
        AdminRequest createRequest = new AdminRequest();
        createRequest.setLogin("adminTest");
        createRequest.setPassword("admin123");

        ResponseEntity<Admin> createResponse = template.postForEntity("/api/utilisateur/admin", createRequest, Admin.class);

        assertEquals(HttpStatus.OK, createResponse.getStatusCode());
        assertNotNull(createResponse.getBody());
        Integer createdAdminId = createResponse.getBody().getId();  

        // ARRANGE
        AdminRequest updateRequest = new AdminRequest();
        updateRequest.setId(createdAdminId);
        updateRequest.setLogin("updatedAdmin");
        updateRequest.setPassword("updatedPass");

        HttpEntity<AdminRequest> entity = new HttpEntity<>(updateRequest);

        // ACT
        ResponseEntity<Admin> response = template.exchange("/api/utilisateur/admin/{id}", HttpMethod.PUT, entity, Admin.class, createdAdminId);

        // ASSERT
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("updatedAdmin", response.getBody().getLogin());

        System.out.println("Test PUT /api/utilisateur/admin/{id} OK");
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

        ResponseEntity<Client> createResponse = template.postForEntity("/api/utilisateur/client", request, Client.class);
        Integer id = createResponse.getBody().getId();

        // ACT
        ResponseEntity<Void> deleteResponse = template.exchange("/api/utilisateur/{id}", HttpMethod.DELETE, null, Void.class, id);

        // ASSERT
        assertEquals(HttpStatus.OK, deleteResponse.getStatusCode());

        System.out.println("Test DELETE /api/utilisateur/{id} OK");
    }
}