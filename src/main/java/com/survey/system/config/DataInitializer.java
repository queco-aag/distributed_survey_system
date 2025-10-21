package com.survey.system.config;

import com.survey.system.model.Role;
import com.survey.system.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        // Initialize default roles if they don't exist
        if (roleRepository.findByName("ROLE_USER").isEmpty()) {
            Role userRole = new Role();
            userRole.setName("ROLE_USER");
            userRole.setDescription("Default user role");
            roleRepository.save(userRole);
        }

        if (roleRepository.findByName("ROLE_ADMIN").isEmpty()) {
            Role adminRole = new Role();
            adminRole.setName("ROLE_ADMIN");
            adminRole.setDescription("Administrator role");
            roleRepository.save(adminRole);
        }

        if (roleRepository.findByName("ROLE_MANAGER").isEmpty()) {
            Role managerRole = new Role();
            managerRole.setName("ROLE_MANAGER");
            managerRole.setDescription("Manager role");
            roleRepository.save(managerRole);
        }
    }
}
