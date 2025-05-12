package projet_jardin.rest;

import java.util.List;

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

import projet_jardin.dao.IDAOJardin;
import projet_jardin.model.Jardin;
import projet_jardin.rest.request.JardinRequest;
import projet_jardin.rest.response.JardinResponse;

@RestController
@RequestMapping("/api/jardin")
public class JardinRestController {

	private IDAOJardin daoJardin;

	public JardinRestController(IDAOJardin daoJardin) {
		super();
		this.daoJardin = daoJardin;
	}
	
	@GetMapping("")
	public List<JardinResponse> getAll(){
		List<Jardin> jardins = this.daoJardin.findAll();			
		return jardins.stream().map(JardinResponse::convert).toList();
	}
	
	@GetMapping("/{numero}")
	public JardinResponse getById(@PathVariable int numero) {
		return this.daoJardin.findById(numero).map(JardinResponse::convert).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
	}

	@GetMapping("nom/{nom}")
	public JardinResponse getByNom(@PathVariable String nom) {
		return this.daoJardin.findByNom(nom).map(JardinResponse::convert).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
	}
	
	@PostMapping("")
	public Jardin create(@RequestBody JardinRequest jardinRequest) {
		Jardin jardin = JardinRequest.convert(jardinRequest);

		return daoJardin.save(jardin);
	}
	
	@PutMapping("/{numero}")
	public Jardin update(@RequestBody JardinRequest jardinRequest, @PathVariable int numero) {
		if (numero != jardinRequest.getNumero() || !this.daoJardin.existsById(numero)) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Incohérence de l'appel");
		}

		Jardin jardin = JardinRequest.convert(jardinRequest);

		

		return daoJardin.save(jardin);
	}
	
	@DeleteMapping("/{numero}")
	public void delete(@PathVariable int numero) {
		if (!this.daoJardin.existsById(numero)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Non trouvé");
		}

		this.daoJardin.deleteById(numero);
	}
	
	
	
}

