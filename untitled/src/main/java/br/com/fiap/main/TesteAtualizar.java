package br.com.fiap.main;

import br.com.fiap.beans.Aluno;
import br.com.fiap.dao.AlunoDAO;

import javax.swing.*;
import java.sql.SQLException;

public class TesteAtualizar {

    static String texto (String j) {
        return JOptionPane.showInputDialog(j);
    }

    static int inteiro(String j) {
        return Integer.parseInt(JOptionPane.showInputDialog(j));
    }

    static double real (String j) {
        return Double.parseDouble(JOptionPane.showInputDialog(j));
    }


    public static void main(String[] args) throws SQLException, ClassNotFoundException {

      // Instanciar objetos
        AlunoDAO alunoDAO = new AlunoDAO();

        Aluno objAluno = new Aluno();

        objAluno.setRm(inteiro("Informe o RM do aluno que sera atualizado "));
        objAluno.setNome(texto("Nome"));
        objAluno.setTurma(texto("Turma"));
        objAluno.setNota(real("Nota"));

        System.out.println(alunoDAO.atualizar(objAluno));

    }

}
