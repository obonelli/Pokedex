import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';

import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({}); // delete * from pokemons;
    // const allDataCount = await this.http.get<PokeResponse>(
    //   'https://pokeapi.co/api/v2/pokemon',
    // );
    const currentId = 1;
    const lastId = 150;
    const fetchPokemon = async (currentId: number, lastId: number) => {
      console.log(`Fetching data ${currentId} of ${lastId}...`);
      if (lastId === 905) {
        console.log(`Data complete!`);
      }
      const data = [];
      for (let i = currentId; i <= lastId; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        data.push(
          axios
            .get(url, {
              responseType: 'json',
            })
            .then((res) => res.data),
        );
      }
      let pokemon = [];
      Promise.all(data)
        .then((results) => {
          pokemon = results.map((result) => ({
            no: result.id,
            name: result.name,
            type: result.types.map((type) => type.type.name).splice(0, 1)[0],
          }));
          this.pokemonModel.insertMany(pokemon);
        })
        .then(() => {
          currentId = lastId + 1;
          lastId = lastId + 151;
          setTimeout(async () => {
            if (currentId <= 905) {
              await fetchPokemon(currentId, lastId);
            }
          }, 3000);
        });
    };
    fetchPokemon(currentId, lastId);
    return 'Sync All Data please wait...';
  }
}
