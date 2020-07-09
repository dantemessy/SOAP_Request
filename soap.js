'use strict';

const fetch = require('node-fetch');
const convert = require('xml-js');
const soapTest = async () => {
    // let xml1 = '<Envelope ' +
    // 'xmlns="http://schemas.xmlsoap.org/soap/envelope/"> '
    // + '<Body>'
    // + '<ListOfCountryNamesByCode xmlns="http://www.oorsprong.org/websamples.countryinfo"/> '
    // + '</Body>'
    // + '</Envelope>'

    let xml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
        <FullCountryInfo xmlns="http://www.oorsprong.org/websamples.countryinfo">
            <sCountryISOCode>JOR</sCountryISOCode>
        </FullCountryInfo>
    </Body>
</Envelope>
`;
    // console.log(xml1)
    console.log(xml)

    const result = await fetch('http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/xml',
        },
        body: xml
    });
    let jsonRes = await result.text();
    let options = {
        compact: true,
        trim: true,
        ignoreDeclaration: true,
        ignoreComment: true,
        alwaysChildren: false    
    };
    
    let parseIt = await convert.xml2js(jsonRes,options);


    console.log('type Of ====> ' ,typeof jsonRes);
    console.log(jsonRes);
    console.log(parseIt);

};
soapTest();
