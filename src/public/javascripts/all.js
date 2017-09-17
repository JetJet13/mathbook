riot.tag2('builder', '<section class="section"> <div class="tabs is-centered is-boxed"> <ul> <li id="configTab"> <a onclick="{pickConfiguration}"> <span>Configuration</span> </a> </li> <li id="contentTab"> <a onclick="{pickContent}"> <span>Content</span> </a> </li> <li id="exercisesTab"> <a onclick="{pickExercises}"> <span>Exercises</span> </a> </li> </ul> </div> <configuration id="config"></configuration> <content id="content"></content> <div id="exercises">EXERCISES PAGE</div> </section>', '', '', function(opts) {
    this.on('mount', function() {
      this.pickConfiguration();
    })

    this.pickConfiguration = function(){
      console.log("PICK CONFIGURATION")
      $("#configTab").addClass("is-active")
      $("#contentTab").removeClass("is-active")
      $("#exercisesTab").removeClass("is-active")
      $("#content").hide();
      $("#exercises").hide();
      $("#config").show();
    }.bind(this)
    this.pickContent = function(){
      console.log("PICK CONTENT")
      $("#configTab").removeClass("is-active")
      $("#contentTab").addClass("is-active")
      $("#exercisesTab").removeClass("is-active")
      $("#content").show();
      $("#exercises").hide();
      $("#config").hide();
    }.bind(this)
    this.pickExercises = function(){
      console.log("PICK EXERCISES")
      $("#configTab").removeClass("is-active")
      $("#contentTab").removeClass("is-active")
      $("#exercisesTab").addClass("is-active")
      $("#content").hide();
      $("#exercises").show();
      $("#config").hide();
    }.bind(this)
});

riot.tag2('configuration', '<section class="section"> <div class="container"> <h5 class="title">Configuration</h5> <subject></subject> <br> <config-title></config-title> <br> <opening-statement></opening-statement> <br> <pre-req></pre-req> <br> <table-of-contents></table-of-contents> <br> <exercise-statement></exercise-statement> <br> <resources></resources> <br> <keywords></keywords> </section>', '', '', function(opts) {
});

riot.tag2('content', '<section class="section"> <div id="contentContainer" class="container"> <h5 class="title">Content</h5> <h6 class="subtitle">The content explains the \'What\', \'Why\' and \'How\'</h6> <div class="field"> <div class="control"> <input type="text" id="contentTitle" class="input" placeholder="Section Title ie) Understanding Factoring"> </div> </div> <div class="field"> <div class="control"> <textarea id="contentSection" class="textarea" placeholder="Consider this one section"></textarea> </div> <br> <div class="control"> <label>Preview</label> <div class="box"> <p id="contentSectionText"></p> </div> </div> </div> <div class="control"> <a class="button is-info" onclick="{saveSection}">Save Section</a> </div> <br> </div> </section>', 'content #contentSectionText,[data-is="content"] #contentSectionText{ white-space: pre-wrap; }', '', function(opts) {
    var that = this

  this.on('mount', function() {

    $('#contentSection').on('input', function(e) {
      var osText = $('#contentSection').val()
      console.log('osText', osText)
      $('#contentSectionText').html(osText)
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'contentSectionText'])
    });
  })

  this.saveSection = function(){
    var sectionNumber = $('.box').length
    var sectionId = 'sectionBox_'+sectionNumber

    var sectionTitle = $('#contentTitle').val()
    var sectionText = $('#contentSection').val()
    var sectionContent = $('#contentSectionText').html()
    $('#contentContainer').append('<content-section id="'+sectionId+'"></content-section>')
    riot.mount('#'+sectionId, { sectionTitle: sectionTitle, sectionContent: sectionContent, sectionText: sectionText })
    this.cleanupFields()
  }.bind(this)

  this.cleanupFields = function(){
    $('#contentTitle').val('')
    $('#contentSection').val('')
    $('#contentSectionText').html('')
  }.bind(this)

});
riot.tag2('config-title', '<div class="field"> <label class="label">Title</label> <div class="control"> <input class="input" type="text" placeholder="Tutorial Title"> </div> </div>', '', '', function(opts) {
});
riot.tag2('exercise-statement', '<div class="field"> <label class="label">Exercises\' Statement</label> <div class="control"> <input id="exerciseStatement" class="input" type="text" placeholder="e.g. Solve for \\\\(y\\\\) for the following exercises"> </div> <br> <div class="control"> <label>Preview</label> <div class="box"> <p id="exerciseStatementText"></p> </div> </div> </div>', '', '', function(opts) {
    var that = this

  this.on('mount', function() {

    $('#exerciseStatement').on('input', function(e) {
      var osText = $('#exerciseStatement').val()
      console.log('osText', osText)
      $('#exerciseStatementText').html(osText)
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'exerciseStatementText'])
    });
  })

});
riot.tag2('keywords', '<div class="field"> <label class="label">Keywords <span class="normal">(max. 5)</span></label> </div> <div class="field is-grouped" id="preReq"> <div class="control is-expanded"> <input class="input {is-danger: invalidKeyword}" id="keyword" type="text" placeholder="Section Name" ref="keyword"> <p show="{invalidKeyword}" class="help is-danger">Keyword can\'t be empty</p> <p show="{tooManyKeywords}" class="help is-danger">max. number of keywords reached (5).</p> </div> <div class="control"> <a class="button is-success" onclick="{addKeyword}">Add</a> </div> </div> <div each="{keyword in keywords}" class="field"> <div class="control"> <span> {keyword}</span> <a class="tag is-danger" onclick="{removeKeyword}"> REMOVE </a> </div> </div>', '', '', function(opts) {
    this.keywords = []
    this.invalidKeyword = false
    this.tooManyKeywords = false
    this.addKeyword = function() {

      var keyword = this.refs.keyword.value
      console.log(keyword)
      this.invalidKeyword = isKeywordInvalid(keyword)
      if (!this.invalidKeyword) {
        if (this.keywords.length >= 5) {
          this.tooManyKeywords = true
          return
        }
        this.tooManyKeywords = false
        var insertIndex = this.keywords.length - 2
        this.keywords.splice(insertIndex, 0, keyword)
        console.log("Keyword IS VALID")
        this.refs.keyword.value = ''
        return
      }
        console.log("Keyword IS INVALID")

    }.bind(this)

    this.removeKeyword = function(event) {

      var item = event.item

      var index = this.keywords.indexOf(item)

      this.keywords.splice(index, 1)
    }.bind(this)

    function isKeywordInvalid(keyword) {
      return ($.trim(keyword) === '')
    }
});
riot.tag2('opening-statement', '<div class="field"> <label class="label">Opening Statement</label> <div class="control"> <textarea id="openingStatement" class="textarea"></textarea> </div> <br> <div class="control"> <label>Preview</label> <div class="box"> <p id="openingStatementText"></p> </div> </div> </div>', 'opening-statement #openingStatementText,[data-is="opening-statement"] #openingStatementText{ white-space: pre-wrap; }', '', function(opts) {
    var that = this

  this.on('mount', function() {

    $('#openingStatement').on('input', function(e) {
      var osText = $('#openingStatement').val()
      console.log('osText', osText)
      $('#openingStatementText').html(osText)
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'openingStatementText'])
    });
  })

});
riot.tag2('pre-req', '<div class="field"> <label class="label">Prerequisite Topics</label> </div> <div class="field is-grouped" id="preReq"> <div class="control is-expanded"> <input class="input {is-danger: invalidPreReqTitle}" id="preReqTitle" type="text" placeholder="Topic Title" ref="preReqTitle"> <p show="{invalidPreReqTitle}" class="help is-danger">Title can\'t be empty</p> </div> <div class="control is-expanded"> <input class="input {is-danger: invalidPreReqUrl}" id="preReqUrl" type="text" placeholder="Topic Url" ref="preReqUrl"> <p show="{invalidPreReqUrl}" class="help is-danger">Invalid Url</p> </div> <div class="control"> <a class="button is-success" onclick="{addPreReq}">Add</a> </div> </div> <div each="{preRequisites}" class="field"> <div class="control"> <a class="tag is-danger" onclick="{removePreReq}"> REMOVE </a> <span>{title} - {url}</span> </div> </div>', '', '', function(opts) {
    this.preRequisites = []
    this.invalidPreReqTitle = false
    this.invalidPreReqUrl = false
    this.addPreReq = function() {
      var preReq = {
        title: this.refs.preReqTitle.value,
        url: this.refs.preReqUrl.value
      }
      console.log(preReq)
      this.invalidPreReqTitle = isPreReqTitleInvalid(preReq.title)
      this.invalidPreReqUrl = isPreReqUrlInvalid(preReq.url)
      if (!this.invalidPreReqTitle && !this.invalidPreReqUrl) {
        this.preRequisites.push(preReq)
        console.log("PREREQ IS VALID")
        this.refs.preReqTitle.value = ''
        this.refs.preReqUrl.value = ''
        return
      }
        console.log("PREREQ IS INVALID")

    }.bind(this)

    this.removePreReq = function(event) {

      var item = event.item

      var index = this.preRequisites.indexOf(item)

      this.preRequisites.splice(index, 1)
    }.bind(this)

    function isPreReqTitleInvalid(title) {
      return ($.trim(title) === '')
    }
    function isPreReqUrlInvalid(url) {
      var urlPattern = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm)
      return (!urlPattern.test(url))
    }
});
riot.tag2('resources', '<div class="field"> <label class="label">Resources</label> </div> <div class="field is-grouped" id="resource"> <div class="control is-expanded"> <input class="input {is-danger: invalidResourceTitle}" id="resourceTitle" type="text" placeholder="Resource Title" ref="resourceTitle"> <p show="{invalidResourceTitle}" class="help is-danger">Title can\'t be empty</p> </div> <div class="control is-expanded"> <input class="input {is-danger: invalidResourceUrl}" id="resourceUrl" type="text" placeholder="Resource Url" ref="resourceUrl"> <p show="{invalidResourceUrl}" class="help is-danger">Invalid Url</p> </div> <div class="control"> <a class="button is-success" onclick="{addResource}">Add</a> </div> </div> <div each="{resources}" class="field"> <div class="control"> <a class="tag is-danger" onclick="{removeResource}"> REMOVE </a> <span>{title} - {url}</span> </div> </div>', '', '', function(opts) {
    this.resources = []
    this.invalidResourceTitle = false
    this.invalidResourceUrl = false
    this.addResource = function() {
      var resource = {
        title: this.refs.resourceTitle.value,
        url: this.refs.resourceUrl.value
      }
      console.log(resource)
      this.invalidResourceTitle = isResourceTitleInvalid(resource.title)
      this.invalidResourceUrl = isResourceUrlInvalid(resource.url)
      if (!this.invalidResourceTitle && !this.invalidResourceUrl) {
        this.resources.push(resource)
        console.log("Resource IS VALID")
        this.refs.resourceTitle.value = ''
        this.refs.resourceUrl.value = ''
        return
      }
        console.log("Resource IS INVALID")

    }.bind(this)

    this.removeResource = function(event) {

      var item = event.item

      var index = this.resources.indexOf(item)

      this.resources.splice(index, 1)
    }.bind(this)

    function isResourceTitleInvalid(title) {
      return ($.trim(title) === '')
    }
    function isResourceUrlInvalid(url) {
      var urlPattern = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm)
      return (!urlPattern.test(url))
    }
});
riot.tag2('subject', '<div class="field"> <label class="label">Subject</label> <div class="control"> <div class="select"> <select> <option>Elementary Algebra</option> <option>Calculus</option> <option>Linear Algebra</option> <option>Number Theory</option> <option>Geometry</option> <option>Combinatorics</option> </select> </div> </div> </div>', '', '', function(opts) {
});
riot.tag2('table-of-contents', '<div class="field"> <label class="label">Table of Contents</label> </div> <div class="field is-grouped" id="preReq"> <div class="control is-expanded"> <input class="input {is-danger: invalidTitle}" id="title" type="text" placeholder="Section Name" ref="title"> <p show="{invalidTitle}" class="help is-danger">Title can\'t be empty</p> </div> <div class="control"> <a class="button is-success" onclick="{addTitle}">Add</a> </div> </div> <div each="{tableOfContents}" class="field"> <div class="control"> <span>- {title}</span> <a show="{isContent}" class="tag is-danger" onclick="{removeTitle}"> REMOVE </a> </div> </div>', '', '', function(opts) {
    this.tableOfContents = [
      { title: 'Introduction' },
      { title: 'Prerequisites' },
      { title: 'Exercises' },
      { title: 'Resources' }
    ]
    this.invalidTitle = false
    this.addTitle = function() {
      var content = {
        title: this.refs.title.value,
        isContent: true
      }
      console.log(content)
      this.invalidTitle = isTitleInvalid(content.title)
      if (!this.invalidTitle) {
        var insertIndex = this.tableOfContents.length - 2
        this.tableOfContents.splice(insertIndex, 0, content)
        console.log("Title IS VALID")
        this.refs.title.value = ''
        return
      }
        console.log("Title IS INVALID")

    }.bind(this)

    this.removeTitle = function(event) {

      var item = event.item

      var index = this.tableOfContents.indexOf(item)

      this.tableOfContents.splice(index, 1)
    }.bind(this)

    function isTitleInvalid(title) {
      return ($.trim(title) === '')
    }
});
riot.tag2('content-section', '<div class="box"> <div class="level"> <div class="level-right"> <a class="level-item" onclick="{editSection}"> <span class="icon is-small has-text-info"><i class="fa fa-pencil" aria-hidden="true"></i></span> </a> <a class="level-item" onclick="{removeSection}"> <span class="icon is-small has-text-danger"><i class="fa fa-close" aria-hidden="true"></i></span> </a> </div></div> <div class="title is-4">{sectionTitle}</div> <div class="content" id="{sectionId}"></div> </div> <div class="modal {is-active: showModal}"> <div class="modal-background"></div> <div class="modal-card"> <header class="modal-card-head"> <p class="modal-card-title">Edit Section</p> <button class="delete" aria-label="close" onclick="{closeModal}"></button> </header> <section class="modal-card-body"> <div class="field"> <div class="control"> <input type="text" id="editContentTitle" class="input" placeholder="Section Title ie) Understanding Factoring"> </div> </div> <div class="field"> <div class="control"> <textarea id="editContentSection" class="textarea" placeholder="Edit section content"></textarea> </div> <br> <div class="control"> <label>Preview</label> <div class="box"> <p id="editContentSectionText"></p> </div> </div> </div> </section> <footer class="modal-card-foot"> <button class="button is-success" onclick="{saveChanges}">Save changes</button> <button class="button" onclick="{closeModal}">Cancel</button> </footer> </div> </div>', '', '', function(opts) {
console.log(this.opts)
this.showModal = false
this.sectionId = 'content_' + this.opts.id
this.sectionTitle = this.opts.sectionTitle

this.on('mount', function() {
  $('#'+this.sectionId).html(this.opts.sectionContent)

  $('#editContentSection').on('input', function(e) {
      var osText = $('#editContentSection').val()
      console.log('editOsText', osText)
      $('#editContentSectionText').html(osText)
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'editContentSectionText'])
    });

})

this.editSection = function(){
  this.showModal = true
  $('#editContentTitle').val(this.sectionTitle)
  $('#editContentSection').val(this.opts.sectionText)
  $('#editContentSectionText').html(this.opts.sectionContent)
}.bind(this)

this.saveChanges = function(){
  var confirmChanges = confirm('Would you like to confirm these changes ?')
  if (confirmChanges){
    this.sectionTitle = $('#editContentTitle').val()
    this.opts.sectionText = $('#editContentSection').val()
    this.opts.sectionContent = $('#editContentSectionText').html()
    $('#'+this.sectionId).html(this.opts.sectionContent)
    this.closeModal()
  }
}.bind(this)

this.closeModal = function(){
  this.showModal = false
}.bind(this)

this.removeSection = function(){
  var confirmChanges = confirm('Are you sure you want to delete the chosen section ?')
  if (confirmChanges){
    this.unmount(true)
    $('#'+this.opts.id).remove()
  }
}.bind(this)
});