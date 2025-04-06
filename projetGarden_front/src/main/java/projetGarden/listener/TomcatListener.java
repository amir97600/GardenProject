package projetGarden.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import quest.context.Singleton;

@WebListener
public class TomcatListener implements ServletContextListener {

	public void contextInitialized(ServletContextEvent sce)  { 
		
		System.out.println("Start Tomcat");
		try {Class.forName("com.mysql.jdbc.Driver");} catch (ClassNotFoundException e) {e.printStackTrace();}
		Singleton.getInstance();
	}

	public void contextDestroyed(ServletContextEvent sce)  { 
		Singleton.getInstance().closeEmf();
	}



}
