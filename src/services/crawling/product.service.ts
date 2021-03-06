import { Injectable } from '@nestjs/common';
import puppeteer = require('puppeteer');
import { ProductDetailQueryInterface, ProductSiblingQueryInterface } from '../../interfaces/naver-cafe.interface';

@Injectable()
export class ProductService {
  async naverCafeProduct(queries: ProductDetailQueryInterface) {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    const pageObject = await page.goto(
      `https://apis.naver.com/cafe-web/cafe-articleapi/v2/cafes/${queries.cafeUrl}/articles/${queries.articleId}?${
        queries.art ? 'art=' + queries.art : ''
      }&useCafeId=false`,
    );
    return (await pageObject.json()).result;
  }

  async naverCafeProductSiblings(queries: ProductSiblingQueryInterface) {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    const pageObject = await page.goto(
      `https://apis.naver.com/cafe-web/cafe-articleapi/v2/cafes/${queries.cafeId}/articles/${queries.articleId}/siblings?limit=${queries.limit}&fromAllArticleList=true&page=${queries.page}`,
    );
    return (await pageObject.json()).result;
  }
}
