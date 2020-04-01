import { Component, OnInit } from '@angular/core';
import { Article } from './article';
import { ArticleService } from './article.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  public articles : Article[] = [];

  constructor(
    private articleService: ArticleService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.articles = this.articleService.getArticles();
    this.articleService.getUpdatedArticles()
      .subscribe(updatedArticles => {
        this.articles = updatedArticles;
      });
  }

  deleteArticle(index: number) {
    this.articleService.deleteArticleWithIndex(index);
    this.createSnackBar('Article deleted!');
  }

  createSnackBar(message: string) {
    this.snackbar.open(message, null, {
      duration: 2000
    });
  }

}
