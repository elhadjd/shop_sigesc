import React from 'react';
import styles from './styles.module.scss'
export default function Privacy(){
    return (
        <div className={styles.privacyContainer}>
            <head>
            <title>Política de Privacidade</title>
            </head>

            <h1>Política de Privacidade</h1>
            <p>
            <strong>Coleta de Informações:</strong> Comprometemo-nos a coletar apenas dados essenciais para aprimorar a experiência do usuário e facilitar transações.
            </p>
            <p>
            <strong>Uso Responsável:</strong> As informações dos usuários são utilizadas exclusivamente para fornecer serviços, melhorar a plataforma e personalizar a experiência de compra.
            </p>
            <p>
            <strong>Segurança dos Dados:</strong> Implementamos medidas rigorosas de segurança para proteger as informações dos usuários contra acessos não autorizados ou qualquer forma de manipulação.
            </p>
            <p>
            <strong>Compartilhamento Limitado:</strong> Garantimos que as informações dos usuários não serão compartilhadas com terceiros sem consentimento explícito, a menos que seja necessário para processar transações ou cumprir requisitos legais.
            </p>
            <p>
            <strong>Transparência:</strong> Comprometemo-nos a ser transparentes sobre o uso de dados, informando os usuários sobre as práticas de privacidade de forma clara e acessível.
            </p>
            <p>
            <strong>Acesso e Controle:</strong> Oferecemos aos usuários o controle sobre suas informações, permitindo o acesso, correção ou exclusão de dados pessoais.
            </p>
        </div>
    );
};