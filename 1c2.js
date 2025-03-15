var numMissedButMatched = 0;

        function checkForMatchingWords(word, paragraph, startIndex) {
            var wordsToCheck = 1;
            for (var i = 0; i < wordsToCheck && (startIndex + i) < paragraph.length; i++) {
                var nextWord = paragraph[startIndex + i];
                if (word === nextWord) {
                    return true;
                }
            }
            return false;
        }
function isSimilar(wordA, wordB) {
            var minLength = Math.min(wordA.length, wordB.length);
            var maxLength = Math.max(wordA.length, wordB.length);
            var similarCount = 0;
            //var threshold = document.getElementById('checkbox1').checked ? 100 : 50;
            var threshold=50;
            for (var i = 0; i < minLength; i++) {
                if (wordA[i] === wordB[i]) {
                    similarCount++;
                }
            }

            var similarityPercentage = (similarCount / maxLength) * 100;
            return similarityPercentage >= threshold;
        }
function arraysAreEqual(arr1, arr2) {
            if (arr1.length !== arr2.length) {
                return false;
            }
            for (var i = 0; i < arr1.length; i++) {
                if (arr1[i] !== arr2[i]) {
                    return false;
                }
            }
            return true;
        }
function compareParagraphs() {

    // Get the paragraphs and remove HTML tags and replace curly apostrophes
    var paragraphA = document
        .getElementById('paragraphA')
        .value
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/[\u2018\u2019]/g, "'") // Replace curly apostrophes with straight ones
        .trim()
        .split(/\s+/);

    var paragraphB = document
        .getElementById('paragraphB')
        .value
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/[\u2018\u2019]/g, "'") // Replace curly apostrophes with straight ones
        .trim()
        .split(/\s+/);
            var comparedText = '';
            var numHalfDiff = 0;
            var numFullDiff = 0;
            var wordAIndex = 0;
            var wordBIndex = 0;
           // Add a container div with border around all colored boxes and labels
comparedText += '<div style="border: 1px solid black; width: 930px; padding: 5px; border-radius: 4px; margin-bottom: 10px;">';


// Add the three colored boxes with rounded corners, spacing, and bold text
comparedText += '<div style="display: flex; align-items: center; margin-bottom: 5px;">';
comparedText += '<div style="width: 20px; height: 20px; background-color: red; border-radius: 4px;"></div>';
comparedText += '<strong style="margin-left: 5px;">Addition of word.</strong>';
comparedText += '</div>';

comparedText += '<div style="display: flex; align-items: center; margin-bottom: 5px;">';
comparedText += '<div style="width: 20px; height: 20px; background-color: green; border-radius: 4px;"></div>';
comparedText += '<strong style="margin-left: 5px;">Omission of word.</strong>';
comparedText += '</div>';

comparedText += '<div style="display: flex; align-items: center; margin-bottom: 10px;">';
comparedText += '<div style="width: 20px; height: 20px; background-color: orange; border-radius: 4px;"></div>';
comparedText += '<strong style="margin-left: 5px;">Spelling Mistakes</strong>';
comparedText += '</div>';

comparedText += '<div style="display: flex; align-items: center; margin-bottom: 10px;">';
comparedText += '<div style="width: 20px; height: 20px; background-color: violet; border-radius: 4px;"></div>';
comparedText += '<strong style="margin-left: 5px;">Capitalization Mistakes</strong>';
comparedText += '</div>';


// Close the container div
comparedText += '</div>';




            
            var useNewLogic = true;

            while (wordAIndex < paragraphA.length || wordBIndex < paragraphB.length) {
                var wordA = paragraphA[wordAIndex] || '';
                var wordB = paragraphB[wordBIndex] || '';
                var cleanWordA = wordA.replace(/[,\?\-\s]/g, '');
                var cleanWordB = wordB.replace(/[,\?\-\s]/g, '');

                if (cleanWordA === cleanWordB) {
                    comparedText += '<span>' + wordA + '</span> ';
                    wordAIndex++;
                    wordBIndex++;
                } else if (cleanWordA.toLowerCase() === cleanWordB.toLowerCase()) {
                    comparedText += '<span style="background-color: violet;">' + wordA + '</span> ';
                    comparedText += '<span style="text-decoration: line-through; text-decoration-color: black; background-color: violet;">' + wordB + '</span> ';
                    wordAIndex++;
                    wordBIndex++;
					
					numHalfDiff++;
					
                } else {
                    if (!wordA) {
                        comparedText += '<span style="background-color: red; text-decoration: line-through;">' + wordB + '</span> ';
                        wordBIndex++;
                        numFullDiff++;
                    } else {
                        if (wordA === paragraphB[wordBIndex]) {
                            comparedText += '<span style="background-color: orange;">' + wordA + '</span> ';
                            wordAIndex++;
                            wordBIndex++;
                        } else if (wordB === paragraphA[wordAIndex]) {
                            comparedText += '<span style="text-decoration: line-through; text-decoration-color: black; background-color: orange;">' + wordB + '</span> ';
                            wordAIndex++;
                            wordBIndex++;
                        } else if (isSimilar(wordA, wordB)) {
                            comparedText += '<span style="background-color: orange;">' + wordA + '</span> ';
                            comparedText += '<span style="text-decoration: line-through; text-decoration-color: black; background-color: orange;">' + wordB + '</span> ';
                            wordAIndex++;
                            wordBIndex++;
                            numHalfDiff++;
                        } else {
                            var pairA = [wordA];
                            var pairB = [wordB];
                            for (var i = 1; i < 5 && (wordBIndex + i) < paragraphB.length; i++) {
                                pairB.push(paragraphB[wordBIndex + i]);
                            }
                            for (var i = 1; i < 5 && (wordAIndex + i) < paragraphA.length; i++) {
                                pairA.push(paragraphA[wordAIndex + i]);
                            }

                            var foundPairInA = false;
                            for (var i = 1; i <= 50 && (wordAIndex + i) < paragraphA.length; i++) {
                                var subarrayA = paragraphA.slice(wordAIndex + i, wordAIndex + i + pairB.length);
                                if (arraysAreEqual(subarrayA, pairB)) {
                                    for (var j = 0; j < i; j++) {
                                        comparedText += '<span style="background-color: green;">' + paragraphA[wordAIndex + j] + '</span> ';
                                        numFullDiff++;
                                    }
                                    comparedText += '<span class="no-background-color">' + pairB.join(' ') + '</span> ';
                                    wordAIndex += i + pairB.length;
                                    wordBIndex += pairB.length;
                                    foundPairInA = true;
                                    break;
                                }
                            }

                            if (!foundPairInA) {
                                var foundPairInB = false;
                                for (var i = 1; i <= 50 && (wordBIndex + i) < paragraphB.length; i++) {
                                    var subarrayB = paragraphB.slice(wordBIndex + i, wordBIndex + i + pairA.length);
                                    if (arraysAreEqual(subarrayB, pairA)) {
                                        for (var j = 0; j < i; j++) {
                                            comparedText += '<span style="background-color: red; text-decoration: line-through; text-decoration-color: black;">' + paragraphB[wordBIndex + j] + '</span> ';
                                            numFullDiff++;
                                        }
                                        comparedText += '<span class="no-background-color">' + pairA.join(' ') + '</span> ';
                                        wordAIndex += pairA.length;
                                        wordBIndex += i + pairA.length;
                                        foundPairInB = true;
                                        break;
                                    }
                                }

                                if (!foundPairInB) {
                                    if (wordB === paragraphA[wordAIndex + 1]) {
                                        var match = checkForMatchingWords(wordA, paragraphB, wordBIndex);
                                        if (match) {
                                            comparedText += '<span class="green-background-color">' + wordA + '</span> ';
                                            comparedText += '<span>' + wordB + '</span> ';
                                            wordAIndex += 2;
                                            wordBIndex++;
                                            numMissedButMatched++;
                                            numFullDiff++;
                                        } else {
                                            comparedText += '<span style="background-color: green;">' + wordA + '</span> ';
                                            comparedText += '<span>' + wordB + '</span> ';
                                            wordAIndex += 2;
                                            wordBIndex++;
                                            numMissedButMatched++;
                                            numFullDiff++;
                                        }
                                    } else if (wordA === paragraphB[wordBIndex + 1]) {
                                        var match = checkForMatchingWords(wordB, paragraphA, wordAIndex);
                                        if (match) {
                                            comparedText += '<span class="text-decoration: line-through; text-decoration-color: black; red-background-color">' + wordB + '</span> ';
                                            comparedText += '<span>' + wordA + '</span> ';
                                            wordBIndex += 2;
                                            wordAIndex++;
                                            numMissedButMatched++;
                                            numFullDiff++;
                                        } else {
                                            comparedText += '<span style="background-color: red; text-decoration: line-through; text-decoration-color: black;">' + wordB + '</span> ';
                                            comparedText += '<span>' + wordA + '</span> ';
                                            wordBIndex += 2;
                                            wordAIndex++;
                                            numMissedButMatched++;
                                            numFullDiff++;
                                        }
                                    } else {
   											 // If checkbox4 is checked
   											 if (true) {
       										 comparedText += '<span style="background-color: green;">' + 												wordA + '</span> ';
       										 wordAIndex++;
       										 wordBIndex++;
       										 numFullDiff++;
       										 comparedText += '<span style="background-color: red; text-decoration: line-through; text-decoration-color: black;">' + wordB + '</span> ';
      										  wordAIndex++;
      										  wordBIndex++;
       										  numFullDiff++;
  											  } else { // If checkbox4 is not checked
                                     	      comparedText += '<span style="background-color: green;">' + 												  wordA + '</span> ';		
                                              comparedText += '<span style="background-color: red; text-decoration: line-through; text-decoration-color: black;;">' + wordB + '</span> ';
                                      		  wordAIndex++;
                                    	      wordBIndex++;
                                              numFullDiff++;
    }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            
            // Calculate total keystrokes for paragraphB
    var keystrokesCount = document.getElementById('paragraphB').value.length;

            var tableContent =
                '<h2>Analysis:</h2>' +
                '<table>' +
                '<tr>' +
                '<th style="border: 2px solid black;">Total Words in Actual Transcription</th>' +
                '<th style="border: 2px solid black;">Total Words in Your Transcription</th>' +
                '<th style="border: 2px solid black;">Number of Half Mistakes</th>' +
                '<th style="border: 2px solid black;">Number of Full Mistakes</th>' +
                '<th style="border: 2px solid black;">Total Keystrokes in your Transcription</th>' +
                '<th style="border: 2px solid black;">Total Percentage of Mistakes (%)</th>' +
                
                '</tr>' +
                '<tr>' +
                '<td style="border: 2px solid black;">' + paragraphA.length + '</td>' +
                '<td style="border: 2px solid black;">' + paragraphB.length + '</td>' +
                '<td style="border: 2px solid black;">' + numHalfDiff + '</td>' +
                '<td style="border: 2px solid black;">' + numFullDiff + '</td>' + 
                '<td style="border: 2px solid black;">' + keystrokesCount + '</td>' +
                '<td style="border: 2px solid black;">' + (((numHalfDiff / 2) + numFullDiff) / paragraphA.length * 100).toFixed(2) + '</td>' +
                '</tr>' +
                '</table>';

            document.getElementById('textBoxC').innerHTML = '<h2>Result Sheet:</h2>' + comparedText + tableContent;
            document.getElementById('textBoxC').style.display = 'block';
            document.getElementById('textBoxC').style.border = '2px solid black';
            var differenceSpans = document.querySelectorAll('#textBoxC span[style*="background-color:"]');
            differenceSpans.forEach(function (span) {
                span.style.color = 'white';
            });

            var combinedContent = document.getElementById('textBoxC').outerHTML;
        }