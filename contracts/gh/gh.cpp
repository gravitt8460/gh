#include <gh.hpp>

#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/action.hpp>
#include <eosiolib/print.hpp>

#include <iostream>

using namespace std;

// start of various time functions
void gh::newitem (  const string    _brand,
                    const string    _title,
                    const string    _sku,
                    const string    _serial,
                    const string    _mfg_loc) {

    items item_table( _self, _self );
    
    item_table.emplace (_self, [&]( auto& i ) {
        i.itemId = item_table.available_primary_key();
        i.brand = _brand;
        i.title = _title;
        i.sku = _sku;
        i.serial = _serial;
        i.dob = now();
        i.mfg_loc = _mfg_loc;
    });
}

void gh::newscan (  const string    _serial,
                    const string    _sku,
                    const string    _latlon,
                    const string    _imagehash) {

    scans scan_table (_self, _self);

    scan_table.emplace (_self, [&](auto& s) {
        s.scanId = scan_table.available_primary_key();
        s.timeofscan = now();
        s.serial = _serial;
        s.sku = _sku;
        s.latlon = _latlon;
        s.imagehash = _imagehash;
    });

}



