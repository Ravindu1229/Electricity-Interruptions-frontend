package com;

import java.io.IOException;
import java.util.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/InterruptionsServlet")
public class InterruptionsAPI extends HttpServlet {

	private static final long serialVersionUID = -8821173037461710172L;
	Interruptions interruptionsObj = new Interruptions();

	public InterruptionsAPI() {
		super();
		// TODO Auto-generated constructor stub
	}

	/*
	 * protected void doGet(HttpServletRequest request, HttpServletResponse
	 * response) throws ServletException, IOException {
	 * 
	 * response.getWriter().append("Served at: ").append(request.getContextPath());
	 * }
	 */

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) 
			 throws ServletException, IOException 
			{ 
			String output = interruptionsObj.insertInterruptions(request.getParameter("region"), 			
			request.getParameter("date"), 
			request.getParameter("stime"), 
			request.getParameter("etime"),
			request.getParameter("status")); 
			response.getWriter().write(output); 
			}


	protected void doPut(HttpServletRequest request, HttpServletResponse response) 
			 throws ServletException, IOException 
			{ 
			Map<String,String> paras = getParasMap(request); 
			String output = interruptionsObj.updateInterruptions(paras.get("hidInterruptionIDSave").toString(), 
			paras.get("region").toString(), 
			paras.get("date").toString(), 
			paras.get("stime").toString(), 
			paras.get("etime").toString(),
			paras.get("status").toString()); 
			response.getWriter().write(output); 
			} 
	
	
			protected void doDelete(HttpServletRequest request, HttpServletResponse response) 
			 throws ServletException, IOException 
			{ 
			Map<String,String> paras = getParasMap(request); 
			String output = interruptionsObj.deleteInterruption(paras.get("interruptionid").toString()); 
			response.getWriter().write(output); 
			}

	
	// Convert request parameters to a Map
			public static Map<String, String> getParasMap(HttpServletRequest request) {
				Map<String, String> map = new HashMap<String, String>();
				try {
					Scanner scanner = new Scanner(request.getInputStream(), "UTF-8");
					String queryString = scanner.hasNext() ? scanner.useDelimiter("\\A").next() : "";
					scanner.close();
					String[] params = queryString.split("&");
					for (String param : params) {
						String[] p = param.split("=");
						map.put(p[0], p[1]);
					}
				} catch (Exception e) {
				}
				return map;
			}

}
