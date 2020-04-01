import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Article } from '../article';
import { ArticleService } from '../article.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  private date: Date;
  private article: Article;
  public index = '';

  public toUpdate: Article;

  constructor(
    private snackBar: MatSnackBar,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Grab index from url
    this.route.paramMap.subscribe(params => {
      this.index = params.get('index');
      this.toUpdate = this.articleService.getArticle(parseInt(this.index));
      console.log(this.toUpdate);
    })
  }

  presentSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000
    });
  }

  processArticleForm(articleFormData: NgForm) {
    // Validation
    if (articleFormData.invalid) {
      this.presentSnackBar('Please check the data');
      return;
    }
    // Parsing date
    this.date = articleFormData.value.date;
    // Save Data
    this.article = {
      title: articleFormData.value.title,
      imgUrl: articleFormData.value.img,
      description: articleFormData.value.desc,
      date: this.date
    };
    // Push Data
    this.articleService.putArticle(this.article);
    // Show success
    this.presentSnackBar('Article published!');
    // Reset form
    articleFormData.resetForm();
  }

  processUpdateForm(updateFormData: NgForm) {
    // Validation
    if (updateFormData.invalid) {
      this.presentSnackBar('Please check the data');
      return;
    }
    // Parsing date
    this.date = updateFormData.value.date;
    // Save Data
    this.article = {
      title: updateFormData.value.title,
      imgUrl: updateFormData.value.img,
      description: updateFormData.value.desc,
      date: this.date
    };
    // Push Data
    this.articleService.updateArticle( parseInt(this.index), this.article);
    // Show update success
    this.presentSnackBar('Article updated!');
    // Reset form
    updateFormData.resetForm();
    // Redirect to articles page
    setTimeout(() => {
      this.router.navigateByUrl('/');
    }, 2000);
  }

}
