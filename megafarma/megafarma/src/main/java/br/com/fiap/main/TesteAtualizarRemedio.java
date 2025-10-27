package br.com.fiap.main;

import br.com.fiap.beans.Remedio;
import br.com.fiap.dao.RemedioDAO;

import javax.swing.*;
import java.sql.SQLException;

public class TesteAtualizarRemedio {
    // String
    static String texto(String j){
        return JOptionPane.showInputDialog(j);
    }

    // int
    static int inteiro(String j){
        return  Integer.parseInt(JOptionPane.showInputDialog(j));
    }

    // double
    static double real(String j){
        return Double.parseDouble(JOptionPane.showInputDialog(j));
    }

    public static void main(String[] args) throws SQLException, ClassNotFoundException {

        RemedioDAO remedioDAO = new RemedioDAO();

        Remedio objRemedio = new Remedio();

        objRemedio.setCodigo(inteiro("Codigo"));
        objRemedio.setNome(texto("Nome"));
        objRemedio.setPreco(real("Preço"));
        objRemedio.setDataDeFabricacao(texto("Data de fabricação"));
        objRemedio.setDataDeValidade(texto("Data de validade"));

        System.out.println(remedioDAO.atualizar(objRemedio));

    }
}
