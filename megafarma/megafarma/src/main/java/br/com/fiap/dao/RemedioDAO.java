package br.com.fiap.dao;

import br.com.fiap.beans.Remedio;
import br.com.fiap.conexoes.ConexaoFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class RemedioDAO {

    public Connection minhaConexao;

    public RemedioDAO() throws SQLException, ClassNotFoundException {
        this.minhaConexao = new ConexaoFactory().conexao();
    }

    //Insert
    public String inserir(Remedio remedio) throws SQLException {
        PreparedStatement stmt = minhaConexao.prepareStatement
                ("Insert into T_FIAP_REMEDIO values (?,?,?,?,?)");
        stmt.setInt(1, remedio.getCodigo());
        stmt.setString(2, remedio.getNome());
        stmt.setDouble(3, remedio.getPreco());
        stmt.setString(4, remedio.getDataDeFabricacao());
        stmt.setString(5, remedio.getDataDeValidade());

        stmt.execute();
        stmt.close();

        return "Remedio cadastrado com sucesso!";
    }

    //Delete
    public String deletar(int codigo) throws SQLException {
        PreparedStatement stmt = minhaConexao.prepareStatement
                ("Delete from T_FIAP_REMEDIO where CODIGO=?");
        stmt.setInt(1, codigo);

        stmt.execute();
        stmt.close();

        return "Remedio deletado com sucesso!";
    }

    // UpDate
    public String atualizar(Remedio remedio) throws SQLException {
        PreparedStatement stmt = minhaConexao.prepareStatement
                ("Update T_FIAP_REMEDIO set NOME=?, PRECO=?, DT_FABRICACAO=?, DT_VALIDADE=?  where CODIGO=?");

        stmt.setString(1, remedio.getNome());
        stmt.setDouble(2, remedio.getPreco());
        stmt.setString(3, remedio.getDataDeFabricacao());
        stmt.setString(4, remedio.getDataDeValidade());
        stmt.setInt(5, remedio.getCodigo());

        stmt.executeUpdate();
        stmt.close();

        return "Remedio atualizado com Sucesso!";
    }

    //Select
    public ArrayList<Remedio> selecionar() throws SQLException {
        ArrayList<Remedio> listaRemedios = new ArrayList<Remedio>();
        PreparedStatement stmt = minhaConexao.prepareStatement
                ("Select * FROM  T_FIAP_REMEDIO ");

        ResultSet rs = stmt.executeQuery();

        while (rs.next()) {
            Remedio objRemedio = new Remedio();
            objRemedio.setCodigo(rs.getInt(1));
            objRemedio.setNome(rs.getString(2));
            objRemedio.setPreco(rs.getDouble(3));
            objRemedio.setDataDeFabricacao(rs.getString(4));
            objRemedio.setDataDeValidade(rs.getString(5));
            listaRemedios.add(objRemedio);
        }

        return listaRemedios;
    }

}





