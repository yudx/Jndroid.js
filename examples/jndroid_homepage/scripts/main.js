/**
 * Created by lency on 4/28/15.
 */

var mIsPhone;
var mTab;
var mMainView;
var mGallery;
var mIntroPage;
var mVSPage;
var mDocPage;
var mAppPage;
var mQAPage;
var mIntroView = null;
var mVSView = null;
var mDocView = null;
var mAppView = null;
var mQAView = null;
var mPages = [];
var mCurrentIndex = 0;

function MainView() {
    ViewGroup.apply(this, []);

    mPageContent = new FrameLayout();
    this.addView(mPageContent);

    mGallery = new Gallery();
    //this.addView(mGallery);

    mTitle = new Titlebar();
    mTitle.setBackgroundColor(R.color.theme);
    this.addView(mTitle);

    mTab = new Tab();
    this.addView(mTab);

    mIntroPage = new FrameLayout();
    mVSPage = new FrameLayout();
    mDocPage = new FrameLayout();
    mAppPage = new FrameLayout();
    mQAPage = new FrameLayout();
    mPageContent.addView(mIntroPage);
    mPageContent.addView(mVSPage);
    mPageContent.addView(mDocPage);
    mPageContent.addView(mAppPage);
    mPageContent.addView(mQAPage);
    mPages.add(mIntroPage);
    mPages.add(mVSPage);
    mPages.add(mDocPage);
    mPages.add(mAppPage);
    mPages.add(mQAPage);

    mVSPage.setVisibility(View.GONE);
    mDocPage.setVisibility(View.GONE);
    mAppPage.setVisibility(View.GONE);
    mQAPage.setVisibility(View.GONE);

    mIntroView = new IntroductionView();

    mIntroPage.addView(mIntroView);


    this.postDelayed(function() {
        if (Manifest.isVersionUpgrade()) {
            if (LSnackBar) {
                LSnackBar.show("版本已更新");
            }
        }
    }, 1000);

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);

        mTitle.measure(MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY),
            MeasureSpec.makeMeasureSpec(48, MeasureSpec.EXACTLY));
        mTab.measure(widthMS, 48);

        var contentHeight = height - mTab.getMeasuredHeight() - mTitle.getMeasuredHeight();
        mPageContent.measure(widthMS, contentHeight);

        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y) {
        var offsetX = 0;
        var offSetY = 0;
        mTitle.layout(offsetX, offSetY);

        offSetY += mTitle.getMeasuredHeight();
        mTab.layout(offsetX, offSetY);

        offSetY += mTab.getMeasuredHeight();
        mPageContent.layout(offsetX, offSetY);
    };
}