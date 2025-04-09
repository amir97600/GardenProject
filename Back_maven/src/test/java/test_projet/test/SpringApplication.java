package test_projet.test;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import test_projet.config.AppConfig;

public class SpringApplication {

	public static void main(String[] args) {
		AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext(AppConfig.class);

		ctx.getBeanFactory().createBean(TestSpring.class).run();
		ctx.close();
	}




}