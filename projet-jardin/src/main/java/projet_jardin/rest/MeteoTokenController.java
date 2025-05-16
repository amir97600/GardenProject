package projet_jardin.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import projet_jardin.service.MeteoTokenService;

@RestController
@RequestMapping("/api/meteo/token")
public class MeteoTokenController {

    @Autowired
    private MeteoTokenService tokenService;

    @GetMapping
    public String getMeteoToken() {
        return tokenService.getToken();
    }
}

