import { Injectable } from '@angular/core';
import { Article } from './article';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private articles: Article[] = [];
  private updateArticles = new Subject<Article[]>();

  constructor() { }

  getArticles() {
    return this.articles;
  }

  putArticle(article: Article) {
    this.articles.push(article);
    this.updateArticles.next(this.articles);
  }

  getArticle(index: number) {
    return this.articles[index];
  }

  updateArticle(index: number, article: Article) {
    this.articles[index] = article;
    this.updateArticles.next(this.articles);
  }

  getUpdatedArticles() {
    return this.updateArticles.asObservable();
  }

  deleteArticleWithIndex(index: number) {
    this.articles.splice(index, 1);
    this.updateArticles.next(this.articles);
  }
}
