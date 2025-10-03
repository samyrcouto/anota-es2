




SELECT RTRIM(
        LTRIM('##**teste de texto bagunçado**##', '#*')        
, '#*') AS LRTRIM
FROM DUAL;

SELECT TRANSLATE ('Ração', 'Çção' , 'Ccao') FROM DUAL;

SELECT REPLACE ('[NOME] Feliz aniversário','[NOME]', 'ANTONIO') as mensagem 
FROM DUAL;

SELECT nome, LENGTH(NOME) AS qtde_caracteres
FROM animais;




SELECT (2+2) as adicao,
       (2-1) as subtracao,
       (5/2) as divisao,
       MOD(5,2) as resto_divisao,
       (3*3) as multiplicacao
FROM DUAL;


SELECT ROUND (5.789  , 2) arrendondando_segunda_casa ,
       ROUND (5.789  , 1) arredondando_primeira_casa,
       TRUNC (5.789  , 2) corta_segunda_casa,
       TRUNC (5.789  , 1) corta_primeira_casa,
       CEIL  (5.789) proximo_numero_inteiro,
       FLOOR (5.789) numero_inteiro_anterior     
FROM DUAL;


SELECT LPAD ('1234' , 100 , '0'), 
       RPAD('122222', 11, '*'),
       RPAD( SUBSTR('Qualidade', 1,4) , 10, '*')
FROM DUAL;


SELECT SYSDATE, CURRENT_TIMESTAMP FROM DUAL;
SELECT SYSDATE, CURRENT_TIMESTAMP FROM DUAL;


SELECT SYSDATE, CURRENT_TIMESTAMP FROM DUAL;

SELECT SYSDATE,
        TRUNC( CURRENT_TIMESTAMP),
        TRUNC(CURRENT_TIMESTAMP, 'MM') primeiro_dia_mes,
        TRUNC( CURRENT_TIMESTAMP, 'YYYY') primeiro_dia_ano,
        LAST_DAY(CURRENT_TIMESTAMP) ultimo_dia_mes,
        NEXT_DAY(CURRENT_TIMESTAMP , 'wednesday') proxima_quarta,
        ADD_MONTHS(SYSDATE, 5) daqui_5_meses,
        SYSDATE+1 amanha
    FROM DUAL;
    
    
    
    
SELECT * FROM tab_vendas;

WITH tabela_filtro AS (SELECT id FROM empresas WHERE categoria = 'AMBEV')
SELECT * FROM tabela
INNER JOIN tabela_filtro ON tabela.status = tabela_filtro.id




        