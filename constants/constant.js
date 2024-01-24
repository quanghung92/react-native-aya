import { Asset } from 'expo-asset';
export const statusClasses = [
    {
        statusKey: 'A',
        statusTitle: 'active',
        statusBGClass: 'transparent',
        statusTextClass: 'text-blue-500',
        statusBorder: '#2E90FA',
    },
    {
        statusKey: 'C',
        statusTitle: 'completed',
        statusBGClass: 'bg-green-400',
        statusTextClass: 'text-green-600',
        statusBorder: '#dcfce7',
    },
    {
        statusKey: 'E',
        statusTitle: 'expired',
        statusBGClass: 'bg-gray-200',
        statusTextClass: 'text-gray-500',
        statusBorder: '#f3f4f6',
    },
    {
        statusKey: 'F',
        statusTitle: 'failed',
        statusBGClass: 'bg-red-300',
        statusTextClass: 'text-red-500',
        statusBorder: '#fee2e2',
    },
    {
        statusKey: 'I',
        statusTitle: 'inprocess',
        statusBGClass: 'bg-blue-200',
        statusTextClass: 'text-blue-600',
        statusBorder: '#fee2e2',
    },
    {
        statusKey: 'U',
        statusTitle: 'cancel',
        statusBGClass: 'bg-red-400',
        statusTextClass: 'text-red-500',
        statusBorder: '#fee2e2',
    }
];

export const langList = [
    {
        "LangId": "en-US",
        "LangName": "English",
        "Image": Asset.fromModule(require('../assets/gb.png'))
    },
    {
        "LangId": "my-MM",
        "LangName": "Burmese",
        "Image": Asset.fromModule(require('../assets/mm.png'))
    }
]

export const ticketTypes = [
    {
        "Icon": Asset.fromModule(require('../assets/tickets/requestaccountstatement.png')),
        "PageId": "mbrequestticketaccountstatement",
        "TypeId": "ACCTSTATEMENT",
        "TypeName": "requestaccountstatement",
        "TypeRootId": "OTHER"
    },
    {
        "Icon": Asset.fromModule(require('../assets/tickets/ticketcanceichequesbook.png')),
        "PageId": "mbticketcancelchequesbook",
        "TypeId": "CANCELCHEQUES",
        "TypeName": "ticketcanceichequesbook",
        "TypeRootId": "OTHER"
    },
    {
        "Icon": Asset.fromModule(require('../assets/tickets/ticketchangeownerinfo.png')),
        "PageId": "mbticketchangeownerinfo",
        "TypeId": "CHANGEOWNERINFO",
        "TypeName": "ticketchangeownerinfo",
        "TypeRootId": "OTHER"
    },
    {
        "Icon": Asset.fromModule(require('../assets/tickets/digitalonboarding.png')),
        "PageId": "mbdigitalonboading",
        "TypeId": "DIGITALONBOARDING",
        "TypeName": "digitalonboarding",
        "TypeRootId": "OTHER"
    },
    {
        "Icon": Asset.fromModule(require('../assets/tickets/ticketissuecheques.png')),
        "PageId": "mbticketissuecheques",
        "TypeId": "ISSUECHEQUES",
        "TypeName": "ticketissuecheques",
        "TypeRootId": "OTHER"
    },
    {
        "Icon": Asset.fromModule(require('../assets/tickets/ticketopenfixeddepositaccount.png')),
        "PageId": "mbticketopenfixeddepositaccount",
        "TypeId": "OPENFIXEDDEPOSIT",
        "TypeName": "ticketopenfixeddepositaccount",
        "TypeRootId": "OTHER"
    },
    {
        "Icon": Asset.fromModule(require('../assets/tickets/ticketotherrequest.png')),
        "PageId": "mbticketotherrequest",
        "TypeId": "OTHERREQUEST",
        "TypeName": "ticketotherrequest",
        "TypeRootId": "OTHER"
    },
    {
        "Icon": Asset.fromModule(require('../assets/tickets/ticketregisteracreditcard.png')),
        "PageId": "mbticketregisteracreditcard",
        "TypeId": "REGISTERCREDITCARD",
        "TypeName": "ticketregisteracreditcard",
        "TypeRootId": "OTHER"
    },
    {
        "Icon": Asset.fromModule(require('../assets/tickets/resetayaservicespassword.png')),
        "PageId": "mbticketresetayaservicepass",
        "TypeId": "RESETPASSWORD",
        "TypeName": "resetayaservicespassword",
        "TypeRootId": "OTHER"
    }
]