export const packagingTypeCode2 = [
    {
        label: "Package",
        value: "02"
    },
    {
        label: "UPS Letter",
        value: "01"
    },

    {
        label: "Tube",
        value: "03"
    },
    {
        label: "Pak",
        value: "04"
    },
    {
        label: "Express Box",
        value: "21"
    },
    {
        label: "25KG Box",
        value: "24"
    },
    {
        label: "10KG Box",
        value: "25"
    },
    {
        label: "Pallet",
        value: "30"
    },
    {
        label: "Small Express Box",
        value: "2a"
    },
    {
        label: "Medium Express Box",
        value: "2b"
    },
    {
        label: "Large Express Box",
        value: "2c"
    }
]



export const DimensionUnitCode2 = [
    {
        label: "Inches",
        value: "IN"
    },
    {
        label: "Centimeters",
        value: "CM"
    }
]

export const PackagTypeDimensionUnitDescription2 = [
    {
        label: "Inches",
        value: "Inches"
    },
    {
        label: "Centimeters",
        value: "Centimeters"
    }
]

export const PackageWeightUnitCode2 = [
    {
        label: "Pounds",
        value: "LBS"
    },
    {
        label: "Kilograms",
        value: "KGS"
    }
]

export const PackageWeightUnitDescription2 = [
    {
        label: "Pounds",
        value: "Pounds"
    },
    {
        label: "Kilograms",
        value: "Kilograms"
    }
]

export const PackagingTypeDescription2 = [
    {
        label: "Package",
        value: "Package"
    },
    {
        label: "UPS Letter",
        value: "UPS Letter"
    },
    {
        label: "Tube",
        value: "Tube"
    },
    {
        label: "Pak",
        value: "Pak"
    },
    {
        label: "Express Box",
        value: "Express Box"
    },
    {
        label: "25KG Box",
        value: "25KG Box"
    },
    {
        label: "10KG Box",
        value: "10KG Box"
    },
    {
        label: "Pallet",
        value: "Pallet"
    },
    {
        label: "Small Express Box",
        value: "Small Express Box"
    },
    {
        label: "Medium Express Box",
        value: "Medium Express Box"
    },
    {
        label: "Large Express Box",
        value: "Large Express Box"
    }
]


export const GetServiceDescription = (code) => {
    switch (code) {
        case '11':
            return 'UPS Standard';
        case '01':
            return 'UPS Express';
        case '02':
            return 'UPS Expedited';
        case '03':
            return 'UPS Ground';
        case '07':
            return 'UPS Worldwide Express';
        case '08':
            return 'UPS Worldwide Expedited';
        case '12':
            return 'UPS 3 Day Select';
        case '13':
            return 'UPS Express Saver';
        case '14':
            return 'UPS Next Day Air®️ Early';
        case '17':
            return 'UPS Worldwide Economy DDU';
        case '54':
            return 'UPS Worldwide Express Plus';
        case '59':
            return '2nd Day Air A.M.';
        case '65':
            return 'UPS Express Saver';
        case 'M2':
            return 'First Class Mail';
        case 'M3':
            return 'Priority Mail';
        case 'M4':
            return 'Expedited MaiI Innovations';
        case 'M5':
            return 'Priority Mail Innovations';
        case 'M6':
            return 'Economy Mail Innovations';
        case 'M7':
            return 'MaiI Innovations (MI) Returns';
        case '70':
            return 'UPS Access Point™️ Economy';
        case '71':
            return 'UPS Worldwide Express Freight Midday';
        case '72':
            return 'UPS Worldwide Economy DDP';
        case '74':
            return 'UPS Express®️12:00';
        case '82':
            return 'UPS Today Standard';
        case '83':
            return 'UPS Today Dedicated Courier';
        case '84':
            return 'UPS Today Intercity';
        case '85':
            return 'UPS Today Express';
        case '86':
            return 'UPS Today Express Saver';
        case '96':
            return 'UPS Worldwide Express Freight';
        default:
            return 'Unknown shipping method';
    }
};


export const shippingMethods = [
    { value: '11', label: 'UPS Standard' },
    { value: '01', label: 'UPS Express' },
    { value: '02', label: 'UPS Expedited' },
    { value: '03', label: 'UPS Ground' },
    { value: '07', label: 'UPS Worldwide Express' },
    { value: '08', label: 'UPS Worldwide Expedited' },
    { value: '12', label: 'UPS 3 Day Select' },
    { value: '13', label: 'UPS Express Saver' },
    { value: '14', label: 'UPS Next Day Air®️ Early' },
    { value: '17', label: 'UPS Worldwide Economy DDU' },
    { value: '54', label: 'UPS Worldwide Express Plus' },
    { value: '59', label: '2nd Day Air A.M.' },
    { value: '65', label: 'UPS Express Saver' },
    { value: 'M2', label: 'First Class Mail' },
    { value: 'M3', label: 'Priority Mail' },
    { value: 'M4', label: 'Expedited MaiI Innovations' },
    { value: 'M5', label: 'Priority Mail Innovations' },
    { value: 'M6', label: 'Economy Mail Innovations' },
    { value: 'M7', label: 'MaiI Innovations (MI) Returns' },
    { value: '70', label: 'UPS Access Point™️ Economy' },
    { value: '71', label: 'UPS Worldwide Express Freight Midday' },
    { value: '72', label: 'UPS Worldwide Economy DDP' },
    { value: '74', label: 'UPS Express®️12:00' },
    { value: '82', label: 'UPS Today Standard' },
    { value: '83', label: 'UPS Today Dedicated Courier' },
    { value: '84', label: 'UPS Today Intercity' },
    { value: '85', label: 'UPS Today Express' },
    { value: '86', label: 'UPS Today Express Saver' },
    { value: '96', label: 'UPS Worldwide Express Freight' },
];
