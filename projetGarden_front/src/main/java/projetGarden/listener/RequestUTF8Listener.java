package projetGarden.listener;

import java.io.UnsupportedEncodingException;

import javax.servlet.ServletRequestEvent;
import javax.servlet.ServletRequestListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class RequestUTF8Listener implements ServletRequestListener {

   
    public void requestDestroyed(ServletRequestEvent sre)  { 
    }

	
    public void requestInitialized(ServletRequestEvent sre)  { 
        try {sre.getServletRequest().setCharacterEncoding("UTF-8");} 
        catch (UnsupportedEncodingException e) {e.printStackTrace();}
    }
	
}
