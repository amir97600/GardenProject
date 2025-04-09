package test_projet.config;

import java.util.Properties;

import javax.persistence.EntityManagerFactory;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@ComponentScan("test_projet.model")
@EnableJpaRepositories("test_projet.dao")
@EnableTransactionManagement
@PropertySource("classpath:infos.properties")
public class AppConfig {

	 @Autowired
	 private Environment env;
	
	@Bean
	public BasicDataSource dataSource() {
		BasicDataSource dataSource = new BasicDataSource();
		dataSource.setDriverClassName(env.getProperty("spring.datasource.driver"));
		dataSource.setUrl(env.getProperty("spring.datasource.url"));
		dataSource.setUsername(env.getProperty("spring.datasource.login"));
		dataSource.setPassword(env.getProperty("spring.datasource.password"));
		dataSource.setMaxTotal(Integer.parseInt(env.getProperty("spring.datasource.total")));
		return dataSource;
	}

	@Bean
	public LocalContainerEntityManagerFactoryBean entityManagerFactory(BasicDataSource dataSource) {
		LocalContainerEntityManagerFactoryBean emf = new LocalContainerEntityManagerFactoryBean();
		JpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
		emf.setDataSource(dataSource);
		emf.setPackagesToScan("test_projet.model");
		emf.setJpaVendorAdapter(vendorAdapter);
		emf.setJpaProperties(this.hibernateProperties());
		return emf;
	}
	private Properties hibernateProperties() {
		Properties properties = new Properties();
	
		properties.setProperty("hibernate.hbm2ddl.auto", env.getProperty("spring.jpa.hibernate.ddl-auto"));
		properties.setProperty("hibernate.dialect", env.getProperty("spring.jpa.hibernate.dialect"));
		properties.setProperty("hibernate.show_sql", env.getProperty("spring.jpa.show-sql"));
		properties.setProperty("hibernate.format_sql", env.getProperty("spring.jpa.format-sql"));
		return properties;
	}

	@Bean
	public JpaTransactionManager transactionManager(EntityManagerFactory emf) {
		JpaTransactionManager transactionManager = new JpaTransactionManager();
		transactionManager.setEntityManagerFactory(emf);
		return transactionManager;
	}
	
	@Bean
	 public PersistenceExceptionTranslationPostProcessor exceptionTranslation() {
	 return new PersistenceExceptionTranslationPostProcessor();
	 }

}
