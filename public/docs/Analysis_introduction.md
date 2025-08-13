# Welcome to MicrobialScope Analysis

## Analysis Description
The MicrobialScope analysis module comprises six main functions: **ORF Prediction & Protein Classification**, **tRNA & tmRNA Prediction**, **Virulence Factors & Antibiotic Resistance Gene Detection**, **Transmembrane Protein Annotation**, **sequence alignment** and **comparative analysis**. Users simply need to provide the genome sequence in **FASTA format** to obtain the results from the above analysis modules.

### ORF Prediction & Protein Classification
The ORF Prediction & Protein Classification module identifies and annotates genetic elements within genomes. **Prokka** [1] is used to detect Open Reading Frames (ORFs)—DNA regions with the potential to be translated into proteins—while **eggNOG-mapper** [2] assigns protein functions. The module outputs annotated sequences in **GFF format**, protein sequences in **FASTA format**, and associated protein metadata.

### tRNA & tmRNA Prediction
The tRNA & tmRNA Prediction module utilizes **ARAGORN** [3] to accurately identify tRNA and tmRNA genes within genomic sequences. These RNA molecules play crucial roles in cellular processes: tRNAs are essential for translating genetic information into proteins during protein synthesis, while tmRNAs function in quality control by rescuing stalled ribosomes and tagging incomplete proteins for degradation.

### Virulence Factor & Antibiotic Resistance Gene Detecion
This module conducts the annotation of both virulence factors and antibiotic resistance genes. Virulence factors are detected by aligning protein sequences against the **VFDB** [5] database using **Diamond** [4], with thresholds set at >60% identity and >40% coverage to ensure accuracy. Antibiotic resistance genes are annotated through a combination of homology searches and SNP modeling, implemented by running **RGI** [6] on protein sequences against the **CARD** [7] database, enabling precise identification of resistance determinants.

### Transmembrane Protein Annotation
The transmembrane protein annotation module detects proteins that span cellular membranes, playing key roles in transport and signaling, using **TMHMM** [8].

### Sequence Alignment
The Sequence Alignment module enables users to compare protein sequences from multiple genomes to identify regions of similarity. Protein sequences are extracted from the annotation file and analyzed using **BLASTP** [9]. The resulting alignment **identity** and **coverage** values can be visualized to highlight conserved regions, detect sequence variations, and identify potential functional elements.

### Comparative Analysis
The Comparative Analysis module builds a comparative tree to represent sequence similarities among microbial genomes. **Alfpy** [10] is used to calculate genome distances from the input sequences, and the **neighbor-joining algorithm** [11] is applied for tree reconstruction. The resulting tree, provided in **Newick format**, visually depicts genetic relatedness, enabling researchers to explore evolutionary histories and trace the divergence and convergence of different lineages.

## References
[1] Seemann,T. (2014) Prokka: Rapid Prokaryotic Genome Annotation. Bioinformatics, 30, 2068–2069.<br>
[2] Cantalapiedra,C.P., Hernández-Plaza,A., Letunic,I., Bork,P. and Huerta-Cepas,J. (2021) Eggnog-mapper V2: Functional annotation, Orthology assignments, and domain prediction at the metagenomic scale. Molecular Biology and Evolution, 38, 5825–5829. <br>
[3] Laslett,D. (2004) Aragorn, a program to detect trna genes and tmrna genes in nucleotide sequences. Nucleic Acids Research, 32, 11–16. <br>
[4] Buchfink,B., Reuter,K. and Drost,H.-G. (2021) Sensitive protein alignments at tree-of-life scale using Diamond. Nature Methods, 18, 366–368. <br>
[5] Chen,L. (2004) VFDB: A reference database for bacterial virulence factors. Nucleic Acids Research, 33, D325-8. <br>
[6] Alcock,B.P., Huynh,W., Chalil,R., Smith,K.W., Raphenya,A.R., Wlodarski,M.A., Edalatmand,A., Petkau,A., Syed,S.A., Tsang,K.K., et al. (2022) Card 2023: Expanded curation, support for machine learning, and resistome prediction at the comprehensive antibiotic resistance database. Nucleic Acids Research, 51, D690-D699. <br>
[7] McArthur,A.G., Waglechner,N., Nizam,F., Yan,A., Azad,M.A., Baylay,A.J., Bhullar,K., Canova,M.J., De Pascale,G., Ejim,L., et al. (2013) The comprehensive antibiotic resistance database. Antimicrobial Agents and Chemotherapy, 57, 3348–3357. <br>
[8] Krogh,A., Larsson,B., von Heijne,G. and Sonnhammer,E.L.L. (2001) Predicting transmembrane protein topology with a hidden Markov model: Application to complete genomes11edited by F. Cohen. Journal of Molecular Biology, 305, 567–580. <br>
[9] Altschul,S.F., Gish,W., Miller,W., Myers,E.W. and Lipman,D.J. (1990) Basic local alignment search tool. Journal of Molecular Biology, 215, 403–410. <br>
[10] Zielezinski,A., Vinga,S., Almeida,J. and Karlowski,W.M. (2017) Alignment-free sequence comparison: Benefits, applications, and Tools. Genome Biology, 18, 186. <br>
[11] The neighbor-joining method: A new method for reconstructing phylogenetic trees. (1987) Molecular Biology and Evolution, 4, 406-425. 
