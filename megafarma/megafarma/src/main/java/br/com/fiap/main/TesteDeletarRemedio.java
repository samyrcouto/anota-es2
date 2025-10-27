package br.com.fiap.main;

import br.com.fiap.beans.Remedio;
import br.com.fiap.dao.RemedioDAO;

import javax.swing.*;
import java.sql.SQLException;

public class TesteDeletarRemedio {

    // int
    static int inteiro(String j){
        return  Integer.parseInt(JOptionPane.showInputDialog(j));
    }

    public static void main(String[] args) throws SQLException, ClassNotFoundException {

        RemedioDAO remedioDAO = new RemedioDAO();

        Remedio objRemedio = new Remedio();

        objRemedio.setCodigo(inteiro("Codigo"));

        System.out.println(remedioDAO.deletar(objRemedio.getCodigo()));
    }
}
