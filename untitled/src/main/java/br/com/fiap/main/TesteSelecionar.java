package br.com.fiap.main;

import br.com.fiap.beans.Aluno;
import br.com.fiap.dao.AlunoDAO;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class TesteSelecionar {

    public static void main(String[] args) throws SQLException, ClassNotFoundException {

        AlunoDAO alunoDAO = new AlunoDAO();

        List<Aluno> listaAlunos = (ArrayList<Aluno>)alunoDAO.selecionar();

        if(listaAlunos != null){
            for(Aluno a : listaAlunos){
                System.out.println(
                        a.getRm() + " " +
                        a.getNome() + " " +
                        a.getTurma() + " " +
                        a.getNota() + " \n"
                );
            }
        }

    }

}
