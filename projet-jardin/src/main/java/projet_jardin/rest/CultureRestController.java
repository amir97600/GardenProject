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

import projet_jardin.dao.IDAOCulture;
import projet_jardin.dao.IDAOUtilisateur;
import projet_jardin.model.Client;
import projet_jardin.model.Culture;
import projet_jardin.rest.request.CultureRequest;
import projet_jardin.rest.response.CultureResponse;
import projet_jardin.rest.request.ClientRequest;
import projet_jardin.service.CultureService;

@RestController
@RequestMapping("/api/culture")
public class CultureRestController {

	private IDAOCulture daoCulture;
	@Autowired
	private IDAOUtilisateur daoUtilisateur;
	@Autowired
	private CultureService cultureService;
	
	public CultureRestController(IDAOCulture daoCulture) {
		super();
		this.daoCulture = daoCulture;
	}
	
	@GetMapping("")
	public List<CultureResponse> getAll() {
		List<Culture> cultures = this.daoCulture.findAll();

		return cultures.stream().map(CultureResponse::convert).toList();
	}
	
	@GetMapping("/{id}")
	public CultureResponse getById(@PathVariable Integer id) {
		return this.daoCulture.findById(id).map(CultureResponse::convert)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
	}
	
	@PostMapping("")
	public Culture create(@RequestBody CultureRequest cultureRequest) {
		Culture culture = CultureRequest.convert(cultureRequest);
		Client client = daoUtilisateur.findClientByIdJardin(cultureRequest.getIdJardin());
		cultureService.ajouterCulture(culture,client.getId());

		return daoCulture.save(culture);
	}

	@PutMapping("/{id}")
	public CultureResponse update(@RequestBody CultureRequest cultureRequest, @PathVariable Integer id) {
		if (id != cultureRequest.getId() || !this.daoCulture.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Incohérence de l'appel");
		}

		Culture culture = CultureRequest.convert(cultureRequest);
		daoCulture.save(culture);

		return CultureResponse.convert(culture);
	}

	@PutMapping("/{id}/arroser")
	public Culture arroser(@PathVariable Integer id) {
    	Culture culture = cultureService.arroserCulture(id);
    	return daoCulture.save(culture);
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Integer id) {
		if (!this.daoCulture.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Non trouvé");
		}

		this.daoCulture.deleteById(id);
	}
	
}
