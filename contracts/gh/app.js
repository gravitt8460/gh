Eos = require("eosjs"); // Eos = require('./src')

wif = "5JhhMGNPsuU42XXjZ57FcDKvbb7KLrehN65tdTQFrH51uruZLHi";
pubkey = "EOS7ckzf4BMgxjgNSYV22rtTXga8R9Z4XWVhYp8TBgnBi2cErJ2hn";


eos = Eos({ keyProvider: wif, chainId:"038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca", httpEndpoint: "http://dev.cryptolions.io:38888" });

// eos.transaction({
//   actions: [
//     {
//       account: "gh2",
//       name: "newitem",
//       authorization: [
//         {
//           actor: "gh2",
//           permission: "active"
//         }
//       ],
//       data: {
//         _brand: "Pepsi",
//         _title: "Diet Pepsi",
//         _sku: "349-PEP-DP",
//         _serial: 3768594729,
//         _mfg_loc: "Atlanta, GA" 
//       }
//     }
//   ]
// });


// eos.transaction({
//     actions: [
//       {
//         account: "gh2",
//         name: "newscan",
//         authorization: [
//           {
//             actor: "gh2",
//             permission: "active"
//           }
//         ],
//         data: {
//           _serial: 3768594729,
//           _sku: "349-PEP-DP",
//           _latlon: "3275329.9832,98324.98324",
//           _imagehash: "oigfjweput8nwtrjdsfhj" 
//         }
//       }
//     ]
//   });




eos.transaction({
  actions: [
    {
      account: "ghtoken2",
      name: "transfer",
      authorization: [
        {
          actor: "ghtoken2",
          permission: "active"
        }
      ],
      data: {
        from: "ghtoken2",
        to: "ghdev",
        quantity: "100.0000 PPV",
        memo: "memo"
      }
    }
  ]
});
