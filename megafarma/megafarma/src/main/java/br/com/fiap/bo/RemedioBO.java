package br.com.fiap.bo;

import br.com.fiap.beans.Remedio;
import br.com.fiap.dao.RemedioDAO;

import java.sql.SQLException;
import java.util.ArrayList;

public class RemedioBO {

    public RemedioDAO remedioDAO;

    //Selecionar
    public ArrayList<Remedio> selecionarBo() throws SQLException, ClassNotFoundException {
        remedioDAO = new RemedioDAO();

        // Regra de negócios

        return (ArrayList<Remedio>) remedioDAO.selecionar();
    }

    //Inserir
    public void inserirBo(Remedio remedio) throws SQLException, ClassNotFoundException {
        RemedioDAO remedioDao = new RemedioDAO();

        // Regra de negócios

        remedioDao.inserir(remedio);
    }

    //Deletar
    public void deletarBo(int codigo) throws SQLException, ClassNotFoundException {
        RemedioDAO remedioDao = new RemedioDAO();

        // Regra de negócios

        remedioDao.deletar(codigo);
    }

    //Atualizar
    public void atualizarBo(Remedio remedio) throws SQLException, ClassNotFoundException {
        RemedioDAO remedioDao = new RemedioDAO();

        // Regra de negócios

        remedioDao.atualizar(remedio);
    }

}
