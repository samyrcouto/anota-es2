package br.com.fiap.api;

public class Endereco {

    /*
            "cep": "01001-000"
            "logradouro": "Praça da Sé"
            "complemento": "lado ímpar"
            "bairro": "Sé"
            "localidade": "São Paulo"
            "uf": "SP"
            "estado": "São Paulo"
            "regiao": "Sudeste"
     */

    private String cep;
    private String logradouro;
    private String complemento;
    private String bairro;
    private String localidade;
    private String uf;
    private String estado;
    private String regiao;

    public Endereco() {
    }

    public Endereco(String cep, String logradouro, String complemento, String bairro, String localidade, String uf, String estado, String regiao) {
        this.cep = cep;
        this.logradouro = logradouro;
        this.complemento = complemento;
        this.bairro = bairro;
        this.localidade = localidade;
        this.uf = uf;
        this.estado = estado;
        this.regiao = regiao;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getLocalidade() {
        return localidade;
    }

    public void setLocalidade(String localidade) {
        this.localidade = localidade;
    }

    public String getUf() {
        return uf;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getRegiao() {
        return regiao;
    }

    public void setRegiao(String regiao) {
        this.regiao = regiao;
    }

    @Override
    public String toString() {
        return "Endereco{" +
                "cep='" + cep +
                " \nlogradouro='" + logradouro +
                "\ncomplemento='" + complemento +
                "\nbairro='" + bairro +
                "\nlocalidade='" + localidade +
                "\nuf='" + uf +
                "\nestado='" + estado +
                "\nregiao='" + regiao
                ;
    }
}


