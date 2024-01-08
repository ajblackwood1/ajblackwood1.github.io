function runAnim() {

	window.scroll(0,0);

	var tl;

	var timing = 1;
	var easeStyl = "power4.out";


	// Sripes Animation reusable JS //

	var stripesTl = function(strPar) {
		return tl = gsap.timeline().to(strPar.find("span.first-stripe, span.second-stripe"), {
			width: 0,
			duration: timing,
			ease: easeStyl
		})
		.to(strPar.find(".bg-wrap"), {
			scale: 1.4,
			duration: timing,
			delay: timing * -1,
			ease: easeStyl
		})
		.to(strPar.find("span.third-stripe, span.fourth-stripe"), {
			width: 0,
			duration: timing,
			delay: -0.2,
			ease: easeStyl
		})
		.to(strPar.find(".bg-wrap"), {
			scale: 1,
			duration: timing,
			delay: timing * -1,
			ease: easeStyl
		})
		.to(strPar.find(".stripes-anim"), {
			css: {
				display: 'none'
			},
			duration: 0,
		});
	}

	// Banner animation chaining JS //

	stripesTl($(".main-wrap")).to(".h1 span", {
		opacity: 1,
		duration: 0,
		delay: -0.4,
		ease: "none"
	})
	.from(".h1 span", {
		skewY: 7,
		yPercent: 103,
		duration: 1,
		ease: easeStyl
	})
	.fromTo(".main-wrap .content-wrap", {
		opacity: 0,
		yPercent: 5,
	},{
		opacity: 1,
		duration: 1,
		delay: -0.4,
		ease: easeStyl
	})
	.to(".main-wrap .bg-inner", {
		scrollTrigger: {
			trigger: ".main-wrap .bg-wrap",
			start: "top top",
			end: "80% top",
			scrub: true,
		},
		scale: 1,
		opacity: 0,
		ease: "none"
	})
	.to(".banner-img", {
		scale: 1,
		duration: timing,
		delay: timing * -0.8,
		ease: easeStyl
	})
	.to(".banner-img > svg", {
		scale: 1,
		duration: timing,
		delay: timing * -1,
		ease: easeStyl
	})
	.to(".banner-img", {
		borderRadius: 0,
		duration: timing,
		delay: (timing - 0.5) * -1,
		ease: easeStyl
	})
	.to(".banner-img", {
		css: {
			overflow: "visible"
		},
		duration: 0,
		ease: "none"
	})
	.to(".bg-line", {
		opacity: 0.6,
		duration: timing/4,
		ease: easeStyl
	});


	// Images stripes Animation JS //

	jQuery(".img-anim").each(function(){
		var checkExecute = (function(x){
			var executed = false;
			return function(x) {
				if (!executed) {
					executed = true;
					stripesTl(x)
				}
			};
		})();
		var $thisAnim = $(this);
		gsap.to($thisAnim, {
			scrollTrigger: {
				trigger: $thisAnim,
				start: "60% bottom",
				onEnter: function() {
					checkExecute($thisAnim)
				},
			}
		});
	});



	// Banner Image Animation JS //

	var morphDuration = 10000;

	var tween1 = KUTE.fromTo('#banner_path1', { 
			path: '#banner_path1' 
		}, { 
			path: '#banner_path2' 
		}, {
		  duration: morphDuration,
		  easing: 'linear'
	});
	var tween2 = KUTE.fromTo('#banner_path1', { 
			path: '#banner_path2' 
		}, { 
			path: '#banner_path3' 
		}, {
		  duration: morphDuration,
		  easing: 'linear'
	});
	var tween3 = KUTE.fromTo('#banner_path1', { 
			path: '#banner_path3' 
		}, { 
			path: '#banner_path1' 
		}, {
		  duration: morphDuration,
		  easing: 'linear'
	});

	tween1.chain(tween2);
	tween2.chain(tween3);
	tween3.chain(tween1);

	tween1.start();


	// Banner Image Line Animation JS //

	var morphLineDuration = 15000;

	var tween_line_1 = KUTE.fromTo('#banner_line_path1', { 
			path: '#banner_line_path1' 
		}, { 
			path: '#banner_line_path2' 
		}, {
		  duration: morphLineDuration,
		  easing: 'linear'
	});
	var tween_line_2 = KUTE.fromTo('#banner_line_path1', { 
			path: '#banner_line_path2' 
		}, { 
			path: '#banner_line_path3' 
		}, {
		  duration: morphLineDuration,
		  easing: 'linear'
	});
	var tween_line_3 = KUTE.fromTo('#banner_line_path1', { 
			path: '#banner_line_path3' 
		}, { 
			path: '#banner_line_path1' 
		}, {
		  duration: morphLineDuration,
		  easing: 'linear'
	});

	tween_line_1.chain(tween_line_2);
	tween_line_2.chain(tween_line_3);
	tween_line_3.chain(tween_line_1);

	tween_line_1.start();


	// Path tracking on scroll Animation JS //

	gsap.to("#track_ball", {
		repeat: 0,
		repeatDelay: 0,
		yoyo: false,
		ease: "none",
		motionPath: {
			path: "#back_line_path",
			align: "#back_line_path",
			alignOrigin: [0.5, 0.5],
			autoRotate: 0,
		},
		scrollTrigger: {
			trigger: ".back-line-wrap",
			start: 'top top',
			end: 'bottom bottom',
			scrub: 1,
			onUpdate: function(self) {
				self.direction >= 0 ? self.animation._pt.t.classList.remove('rev') : self.animation._pt.t.classList.add('rev')
			}
		}
	})
}
jQuery('.enter-site a').on('click', function(event) {
	event.preventDefault();
	jQuery('body').addClass('overflow-auto');
	gsap.timeline().to('.enter-site', {
		opacity: 0,
		duration: 1
	})
	.to('.enter-site', {
		css: {
			visibility: "hidden"
		},
		duration: 0,
		ease: "none",
	});
	runAnim();
});