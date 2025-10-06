package br.com.fiap.main;

import br.com.fiap.api.Endereco;
import br.com.fiap.services.ViacepService;

import javax.swing.*;
import java.io.IOException;

public class TesteViapCep {

    static String texto (String j){
    return JOptionPane.showInputDialog(j);

    }

    public static void main(String[] args) throws IOException {

        ViacepService viacep = new ViacepService();

        String cep = texto("informe o CEP para busca");

        Endereco endereco = viacep.getEndereco(cep);


        System.out.println(endereco);



    }


}
