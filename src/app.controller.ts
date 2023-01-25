import { Body, Controller, Delete, Get, Param, Post, Put, Render } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';
import { Tarhelycsomagok } from './tarhelycsomagok.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }
  
  @Get('/api/tarhely')
  async getTarhely() {
    const repo = this.dataSource.getRepository(Tarhelycsomagok);
    const rows = await repo.find()
    return {rows : rows};
  }

  @Get('/api/tarhely/:id')
  async getOneTarhely(@Param('id') id: number) {
    const coureRepo = this.dataSource.getRepository(Tarhelycsomagok);    
    return coureRepo.findBy({id})
  }

  @Post('/api/tarhely')
  async postTarhely(@Body() tarhely : Tarhelycsomagok) {
    tarhely.id = undefined
    const coureRepo = this.dataSource.getRepository(Tarhelycsomagok);    
    await coureRepo.save(tarhely) 
  };

  @Put('/api/tarhely/:id')
  async putTarhely(@Param('id') id: number, @Body() tarhely : Tarhelycsomagok) {
    tarhely.id = undefined
    const coureRepo = this.dataSource.getRepository(Tarhelycsomagok);    
    await coureRepo.update({id: id}, {id: id, nev: tarhely.nev, meret: tarhely.meret,ar: tarhely.ar} )
  };

  @Delete('/api/tarhely/:id')
  async deleteUserApi(@Param('id') id: number) {
    const coureRepo = this.dataSource.getRepository(Tarhelycsomagok);    
    await coureRepo.delete(id)
  }

}
