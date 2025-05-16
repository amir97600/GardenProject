package projet_jardin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import projet_jardin.rest.request.MeteoFranceRequest;

import java.util.HashMap;
import java.util.Map;

@Service
public class MeteoTokenService {

    @Autowired
    private MeteoFranceRequest properties;

    public String getToken() {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.set("Authorization", "Basic " + properties.getApplicationId());

        HttpEntity<String> request = new HttpEntity<>("grant_type=client_credentials", headers);

        //System.out.println("URL appelée : " + properties.getTokenUrl());


        ResponseEntity<Map> response = restTemplate.exchange(
                properties.getTokenUrl(),
                HttpMethod.POST,
                request,
                Map.class
        );

        if (response.getStatusCode() == HttpStatus.OK) {
            return (String) response.getBody().get("access_token");
        } else {
            throw new RuntimeException("Token non récupéré : " + response.getStatusCode());
        }
    }
}
