package projet_jardin.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import projet_jardin.service.DatabaseService;

@RestController
@RequestMapping("/api/database")
public class DatabaseRestController {

    @Autowired
    private DatabaseService databaseService;

    @GetMapping("/tables")
    public List<String> getAllTables() {
        return databaseService.getAllTables();
    }

}
