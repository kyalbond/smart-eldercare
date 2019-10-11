export class EmergencyDetails {

    public imageURL: any = null;
    public name: any = null;
    public address: any = null;
    public number: any = null;
    public medical: string[] = null;

    public constructor(img: any, name: any, address: any, numbr: any, medical: string[]) {
        this.imageURL = img;
        this.name = name;
        this.address = address;
        this.number = numbr;
        this.medical = medical;
    }

}

export const grandpaJoe: EmergencyDetails = {
    imageURL: 'https://vignette.wikia.nocookie.net/roalddahl/images/b/b9/Illmannered.jpg/revision/latest?cb=20140911174536',
    name: 'Grandpa Joe',
    address: '13 Leifstrbe Munich, Bavaria',
    number: '054-213-56465-12',
    medical: [
        'Arthritis',
        'Respiratoiry Disease',
        'Osteoporosis',
        'Diabetes'
    ]
};
