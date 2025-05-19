package projet_jardin.rest;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import projet_jardin.service.MeteoTokenService;

@RestController
@RequestMapping("/api/meteo")
public class MeteoTokenController {

    static private String token;
    
    @Autowired
    private MeteoTokenService tokenService;

    private final RestTemplate restTemplate = new RestTemplate();

    
    @GetMapping("/token")
    public void getMeteoToken() {
        token = tokenService.getToken();
        //return token;
    }

    @GetMapping("/temperature")
    public ResponseEntity<?> getTemperature(@RequestParam String idStation) {
        
        String url = "https://public-api.meteofrance.fr/public/DPObs/v1/station/infrahoraire-6m?id_station=" + idStation + "&format=json";

        if(token == null){
            getMeteoToken();
        }
        
        
        HttpHeaders headers = new HttpHeaders();
        headers.set("accept", "*/*");
        headers.set("Authorization", "Bearer "+token);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                String.class
            );
            
            return ResponseEntity.ok(response.getBody());
        } catch (HttpClientErrorException | HttpServerErrorException ex) {
            return ResponseEntity.status(ex.getStatusCode()).body(ex.getResponseBodyAsString());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur interne : " + ex.getMessage());
        }
    }

    @GetMapping("/pluie")
    public ResponseEntity<?> getPluie(@RequestParam String idStation, @RequestParam String date) {
        
        String url = "https://public-api.meteofrance.fr/public/DPObs/v1/station/horaire?id_station=" + idStation + "&date="+ date +"&format=json";

        
        getMeteoToken();
      
        
        
        HttpHeaders headers = new HttpHeaders();
        headers.set("accept", "*/*");
        headers.set("Authorization", "Bearer "+token);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                String.class
            );
            
            return ResponseEntity.ok(response.getBody());
        } catch (HttpClientErrorException | HttpServerErrorException ex) {
            return ResponseEntity.status(ex.getStatusCode()).body(ex.getResponseBodyAsString());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur interne : " + ex.getMessage());
        }
    }
}

