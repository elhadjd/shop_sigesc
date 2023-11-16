export const getBgImage = (async(img:string)=>{
    const image = new Image();
    image.src = img;

    image.onload = () => {
        // A imagem foi carregada com sucesso
        obterCorDeFundoDaImagem(image);
    };

    function obterCorDeFundoDaImagem(image: HTMLImageElement) {
        // Crie um elemento temporário para renderizar a imagem
        const tempElement = document.createElement('div');
        tempElement.appendChild(image);

        // Use a biblioteca html2canvas para renderizar a imagem em um canvas
        html2canvas(tempElement).then((canvas:any) => {
            const ctx = canvas.getContext('2d');
            
            // Obtenha a cor média do canvas (que representa a imagem)
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
            const averageColor = getAverageColor(imageData);

            console.log('Cor de fundo da imagem:', averageColor);
        });
    }

    function getAverageColor(imageData: Uint8ClampedArray): string {
        let r = 0;
        let g = 0;
        let b = 0;

        for (let i = 0; i < imageData.length; i += 4) {
            r += imageData[i];
            g += imageData[i + 1];
            b += imageData[i + 2];
        }

        const numPixels = imageData.length / 4;
        r = Math.floor(r / numPixels);
        g = Math.floor(g / numPixels);
        b = Math.floor(b / numPixels);

        return `rgb(${r},${g},${b})`;
    }
    function html2canvas(tempElement: HTMLDivElement) {
        throw new Error("Function not implemented.");
    }
})
