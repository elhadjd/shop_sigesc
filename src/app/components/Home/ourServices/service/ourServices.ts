interface CompanyServices{
    image: string,
    name: string,
    description: string,

}
export const OurService = (()=>{
    const companyServices: CompanyServices[] = [
        {
            description: 'Entregamos com rapidez e segurança diretamente no seu endereço. Desfrute da comodidade de receber seus produtos no conforto da sua casa, garantindo uma experiência de compra sem complicações.',
            image: '/services/img/delivery1.jpg',
            name: 'Entrega Domiciliária Rápida',
        },
        {
            description: 'Oferecemos diversas opções de pagamento para atender às suas preferências. Pague com facilidade no local de entrega ou por transferência, proporcionando conveniência e flexibilidade ao realizar suas compras.',
            image: '/services/img/payment.png',
            name: 'Opções de Pagamento Flexíveis',
        },
        {
            description: 'Valorizamos a satisfação dos nossos clientes. Caso seu produto não atenda às suas expectativas, a primeira troca é gratuita. Queremos garantir que sua experiência de compra seja sempre positiva e sem preocupações.',
            image: '/services/img/changeP.png',
            name: ' Primeira Troca Gratuita',
        },
        {
            description: 'Proporcionamos a opção de pagamento no momento da entrega, proporcionando maior controle e segurança. Pague com tranquilidade ao receber seus produtos, garantindo a conveniência que você merece.',
            image: '/services/img/cash.jpg',
            name: 'Pagamento no Local de Entrega',
        },
    ]
    
    return {companyServices}
})