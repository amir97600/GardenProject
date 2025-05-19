package projet_jardin.rest;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;

import projet_jardin.rest.request.AdminRequest;
import projet_jardin.rest.request.ClientRequest;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class RestUtilisateurMockMvcTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    // -----------------------
    // CLIENTS
    // -----------------------

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void createClientWithAuthAndCleanup() throws Exception {
        ClientRequest client = new ClientRequest();
        client.setLogin("logTest");
        client.setPassword("pass");

        // Création
        MvcResult result = mockMvc.perform(post("/api/utilisateur/client")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(client)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.login").value("logTest"))
            .andReturn();

        // Récupérer l'id du client créé à partir du JSON
        String jsonResponse = result.getResponse().getContentAsString();
        Integer createdId = objectMapper.readTree(jsonResponse).get("id").asInt();

        // Suppression du client créé
        mockMvc.perform(delete("/api/utilisateur/{id}", createdId))
            .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "admin1", roles = {"ADMIN"})
    public void updateClientWithAuthAndCleanup() throws Exception {
        ClientRequest client = new ClientRequest();
        client.setLogin("clientToUpdate");
        client.setPassword("pass");

        // Création
        MvcResult createResult = mockMvc.perform(post("/api/utilisateur/client")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(client)))
            .andExpect(status().isOk())
            .andReturn();

        Integer clientId = objectMapper.readTree(createResult.getResponse().getContentAsString()).get("id").asInt();

        // Mise à jour
        ClientRequest update = new ClientRequest();
        update.setId(clientId);
        update.setLogin("updatedLogin");
        update.setPassword("updatedPass");

        mockMvc.perform(put("/api/utilisateur/client/{id}", clientId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(update)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.login").value("updatedLogin"));

        // Nettoyage
        mockMvc.perform(delete("/api/utilisateur/{id}", clientId))
            .andExpect(status().isOk());
    }

    // -----------------------
    // ADMINS
    // -----------------------

    @Test
    @WithMockUser(username = "admin2", roles = {"ADMIN"})
    public void createAdminWithAuthAndCleanup() throws Exception {
        AdminRequest admin = new AdminRequest();
        admin.setLogin("adminTest");
        admin.setPassword("admin123");

        MvcResult result = mockMvc.perform(post("/api/utilisateur/admin")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(admin)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.login").value("adminTest"))
            .andReturn();

        Integer createdId = objectMapper.readTree(result.getResponse().getContentAsString()).get("id").asInt();

        // Suppression
        mockMvc.perform(delete("/api/utilisateur/{id}", createdId))
            .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "admin3", roles = {"ADMIN"})
    public void updateAdminWithAuthAndCleanup() throws Exception {
        AdminRequest admin = new AdminRequest();
        admin.setLogin("adminToUpdate");
        admin.setPassword("pass");

        // Création
        MvcResult createResult = mockMvc.perform(post("/api/utilisateur/admin")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(admin)))
            .andExpect(status().isOk())
            .andReturn();

        Integer adminId = objectMapper.readTree(createResult.getResponse().getContentAsString()).get("id").asInt();

        // Mise à jour
        AdminRequest update = new AdminRequest();
        update.setId(adminId);
        update.setLogin("updatedAdmin");
        update.setPassword("updatedPass");

        mockMvc.perform(put("/api/utilisateur/admin/{id}", adminId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(update)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.login").value("updatedAdmin"));

        // Nettoyage
        mockMvc.perform(delete("/api/utilisateur/{id}", adminId))
            .andExpect(status().isOk());
    }

}
