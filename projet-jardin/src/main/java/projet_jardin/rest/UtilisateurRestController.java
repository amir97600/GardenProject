package projet_jardin.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import projet_jardin.dao.IDAOUtilisateur;
import projet_jardin.model.Admin;
import projet_jardin.model.Client;
import projet_jardin.rest.request.AdminRequest;
import projet_jardin.rest.request.ClientRequest;
import projet_jardin.rest.response.AdminResponse;
import projet_jardin.rest.response.ClientResponse;

@RestController
@RequestMapping("/api/utilisateur")
public class UtilisateurRestController {
	
	@Autowired
	IDAOUtilisateur daoUtilisateur;
	
	@GetMapping("client")
	public List<ClientResponse> getAllClients(){
		List<Client> users = daoUtilisateur.findAllClient();
		List<ClientResponse> clients = users.stream().map(ClientResponse::convert).toList();
		return clients;
	}
	
	@GetMapping("client/{id}")
	public ClientResponse getByIdClient(@PathVariable Integer id) {
		
		return ClientResponse.convert(daoUtilisateur.findClientById(id));
	}

	@GetMapping("client/bylogin/{login}")
	public ClientResponse getByLoginClient(@PathVariable String login) {
		
		return ClientResponse.convert(daoUtilisateur.findClientByLogin(login));
	}

	@GetMapping("admin/bylogin/{login}")
	public AdminResponse getByLoginAdmin(@PathVariable String login) {
		
		return AdminResponse.convert(daoUtilisateur.findAdminByLogin(login));
	}
	
	@PostMapping("client")
	public Client createClient(@RequestBody ClientRequest clientRequest) {
		Client client = ClientRequest.convert(clientRequest);

		return daoUtilisateur.save(client);
	}
	
	@PutMapping("client/{id}")
	public Client updateClient(@RequestBody ClientRequest clientRequest, @PathVariable Integer id) {
		if (id != clientRequest.getId() || !this.daoUtilisateur.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Incohérence de l'appel");
		}

		Client Client = ClientRequest.convert(clientRequest);

		return daoUtilisateur.save(Client);
	}
	
	
	@GetMapping("admin")
	public List<AdminResponse> getAllAdmins(){
		List<Admin> users = daoUtilisateur.findAllAdmin();
		List<AdminResponse> admins = users.stream().map(AdminResponse::convert).toList();
		return admins;
	}
	
	@GetMapping("admin/{id}")
	public AdminResponse getByIdAdmin(@PathVariable Integer id) {
		
		return AdminResponse.convert(daoUtilisateur.findAdminByID(id));
	}
	
	@PostMapping("admin")
	public Admin createAdmins(@RequestBody AdminRequest adminRequest) {
		Admin Admin = AdminRequest.convert(adminRequest);

		return daoUtilisateur.save(Admin);
	}
	
	@PutMapping("admin/{id}")
	public Admin updateAdmin(@RequestBody AdminRequest adminRequest, @PathVariable Integer id) {
		if (id != adminRequest.getId() || !this.daoUtilisateur.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Incohérence de l'appel");
		}

		Admin Admin = AdminRequest.convert(adminRequest);

		return daoUtilisateur.save(Admin);
	}

	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable Integer id) {
		if (!this.daoUtilisateur.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Non trouvé");
		}

		this.daoUtilisateur.deleteById(id);
	}
}
