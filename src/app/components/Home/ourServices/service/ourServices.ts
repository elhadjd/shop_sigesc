interface CompanyServices{
    image: string,
    name: string,
    description: string,

}
export const OurService = (()=>{
    const companyServices: CompanyServices[] = [
        {
            description: 'Não serviu? Não se preocupe. A primeira troca é por nossa conta.',
            image: '/services/img/troca.png',
            name: 'PRIMEIRA TROCA GRÁTIS',
        },
        {
            description: 'Queremos fazer com que você tenha a melhor experiência online! Para isso, procuramos sempre realizar promoções com frete grátis com nossos produtos e de nossos parceiros. Fique por dentro de nossas promoções e itens especiais com frete grátis no site, redes sociais e e-mails.',
            image: '/services/img/intrega.png',
            name: 'RETIRE GRÁTIS',
        },
        {
            description: 'O Pix é mais uma função de pagamento disponível em nosso site. Para utilizá-lo é muito simples. Ao escolher seus produtos e clicar em finalizar sua compra, escolha a opção pix.',
            image: '/services/img/pix.png',
            name: 'PAGUE COM O PIX',
        },
        {
            description: 'Queremos fazer com que você tenha a melhor experiência online! Para isso, procuramos sempre realizar promoções com frete grátis com nossos produtos e de nossos parceiros. Fique por dentro de nossas promoções e itens especiais com frete grátis no site, redes sociais e e-mails.',
            image: '/services/img/page.png',
            name: 'FRETE GRÁTIS',
        },
    ]
    
    return {companyServices}
})