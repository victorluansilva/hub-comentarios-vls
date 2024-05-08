const formatDate = (data) => {
    const currentDate = new Date(data);
    const options = {
        day: '2-digit',
        month: 'short',
        hour: 'numeric',
        hour12: false
    };

    let formattedDate = currentDate.toLocaleDateString('pt-BR', options)
    return formattedDate.replace(',', ' às') + 'hs';
}

const randomInt = (value) => {
    return Math.floor(Math.random() * value)
}

const randomColors = () => {
    let darkPalette = ['070F2B', '1B1A55', '535C91', '9290C3', '030637', '3C0753', '720455']
    let lightPalette = ['FFBE98', 'FEECE2', 'F6FDC3', 'CDFADB', 'FFF8E3', 'F2F1EB', 'F1EAFF']

    let colors = []
    colors.push(darkPalette)
    colors.push(lightPalette)

    return {
        dark: colors[0][randomInt(colors[0].length)],
        light: colors[1][randomInt(colors[1].length)]
    }
}

export { formatDate, randomColors }