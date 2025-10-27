package br.com.fiap.beans;

public class Remedio {
    private int codigo;
    private String nome;
    private double preco;
    private String dataDeFabricacao;
    private String dataDeValidade;

    public Remedio() {
    }

    public Remedio(int codigo, String nome, double preco, String dataDeFabricacao, String dataDeValidade) {
        this.codigo = codigo;
        this.nome = nome;
        this.preco = preco;
        this.dataDeFabricacao = dataDeFabricacao;
        this.dataDeValidade = dataDeValidade;
    }

    public int getCodigo() {
        return codigo;
    }

    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public double getPreco() {
        return preco;
    }

    public void setPreco(double preco) {
        this.preco = preco;
    }

    public String getDataDeFabricacao() {
        return dataDeFabricacao;
    }

    public void setDataDeFabricacao(String dataDeFabricacao) {
        this.dataDeFabricacao = dataDeFabricacao;
    }

    public String getDataDeValidade() {
        return dataDeValidade;
    }

    public void setDataDeValidade(String dataDeValidade) {
        this.dataDeValidade = dataDeValidade;
    }

    @Override
    public String toString() {
        return "Remedio " +
                "\ncodigo=" + codigo +
                "\nnome='" + nome + '\'' +
                "\npreço=" + preco +
                "\ndata de fabricação='" + dataDeFabricacao + '\'' +
                "\ndata de validade='" + dataDeValidade;
    }
}
