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

import projet_jardin.dao.IDAOPlante;
import projet_jardin.model.Plante;
import projet_jardin.rest.request.PlanteRequest;
import projet_jardin.rest.response.PlanteResponse;

@RestController
@RequestMapping("/plante")
public class PlanteRestController {
	
	private IDAOPlante daoPlante;

	public PlanteRestController(IDAOPlante daoPlante) {
		super();
		this.daoPlante = daoPlante;
	}
	
	@GetMapping("")
	public List<PlanteResponse> findAll() {
		return this.daoPlante.findAll().stream().map(PlanteResponse::convert).toList();
	}
	
	@GetMapping("/{id}")
	public PlanteResponse getById(@PathVariable Integer id) {
		return this.daoPlante.findById(id).map(PlanteResponse::convert)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
	}
	
	@PostMapping("")
	public Plante create(@RequestBody PlanteRequest planteRequest) {
		Plante plante = PlanteRequest.convert(planteRequest);

		return daoPlante.save(plante);
	}

	@PutMapping("/{id}")
	public Plante update(@RequestBody PlanteRequest planteRequest, @PathVariable Integer id) {
		if (id != planteRequest.getId() || !this.daoPlante.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Incohérence de l'appel");
		}

		Plante plante = PlanteRequest.convert(planteRequest);

		return daoPlante.save(plante);
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Integer id) {
		if (!this.daoPlante.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Non trouvé");
		}

		this.daoPlante.deleteById(id);
	}
	
	
	

}
