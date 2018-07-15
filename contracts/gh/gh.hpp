
#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <eosiolib/asset.hpp>

using namespace eosio;
using std::string;

class gh: public contract {
public: 
    gh (account_name self) : contract (self) {}

    // @abi action
   void newitem (  const string         _brand,
                        const string    _title,
                        const string    _sku,
                        const string    _serial,
                        const string    _mfg_loc);

    // @abi action
    void newscan (  const string    _serial,
                    const string    _sku,
                    const string    _latlon,
                    const string    _imagehash);                        
private: 

    // @abi table scans i64
    struct scan {
        uint64_t    scanId;
        string      serial;
        uint64_t    timeofscan;
        string      sku;
        string      latlon;
        string      imagehash;

        uint64_t primary_key() const {return scanId; }
        EOSLIB_SERIALIZE(scan, (scanId)(serial)(timeofscan)(sku)(latlon)(imagehash))
  
    };

    typedef eosio::multi_index<N(scans), scan> scans;

    // @abi table items i64
    struct item {
        uint64_t    itemId;
        string      brand;
        string      title;
        string      sku;
        string      serial;
        uint32_t    dob;
        string      mfg_loc;

        uint64_t primary_key()const { return itemId; }
        EOSLIB_SERIALIZE (item, (itemId)(brand)(title)(sku)(serial)(dob)(mfg_loc))
    };

    typedef eosio::multi_index<N(items), item> items;

};

EOSIO_ABI(gh, (newitem)(newscan))