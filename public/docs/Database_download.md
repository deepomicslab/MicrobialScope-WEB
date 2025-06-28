# How to download MicrobialScope datasets

## Microorganisms sequence download
<div align=center><img src="./DB_figures/download_sequence.png" width="1000"></div>

The `Download`` button in the ``Genome`` interface enables Users retrieval of microbial genomic sequences and associated genome information in desired file with standardized formats.
 
<div align=center><img src="./DB_figures/download_filter.png" width="1000"></div>

Users could also select multiple sequences at the same time and slide the mouse to the ``Download`` button to select the desired data format for downloading. Microbial sequences and information are provided in **FASTA**, **GFF3**, **GBK**, and **tabular** (Meta data) format. 

## Meta data download
MicrobialScope also offers ``Download`` interface for users to retrieve data, including the microbial metadata of genome, protein, tRNA & tmRNA, CRISPR/Cas system, anti-CRISPR protein, secondary metabolite, signal peptide, virulence factor, antibiotic resistance gene, and transmembrane protein. Users could click ``Download XLS`` or ``Download TSV`` button to directly batch download the required files.

<div align=center><img src="./DB_figures/download_interface.png" width="1000"></div>

### Genome meta data download
The metadata for all the **2,652,060** genomes. The table columns represent the following:

+ ``Archaea_ID`` or ``Bacteria_ID`` or ``Fungi_ID`` or ``Viruses_ID``: archaea or bacteria or fungi or viruses ID
+ ``Organism Name``: name for microbial organism
+ ``Taxonomic ID``: NCBI Taxonomic ID for microbial organism
+ ``Species``: species for microbial organism
+ ``Total Sequence Length``: microorganism total sequence length
+ ``GC content``: microorganism GC content
+ ``Assembly Level``: assembly level for microbial sequence
+ ``Total Number of Chromosomes``: total number of chromosomes obtained by microbial assembly sequence
+ ``Contig N50``: N50 of microbial assembly sequence contig
+ ``Scaffold N50``: N50 of microbial assembly sequence scaffold

### Protein meta data download
The metadata for all the **330,950,762** proteins. The table columns represent the following:

+ ``Archaea_ID`` or ``Bacteria_ID`` or ``Fungi_ID`` or ``Viruses_ID``: archaea or bacteria or fungi or viruses ID
+ ``Contig_ID``: microbial sequence assembly contig ID
+ ``Protein_ID``: microbial annotated protein ID
+ ``Orf Prediction Source``: ORF prediction source
+ ``Start``: the protein start site on the contig
+ ``End``: the protein end site on the contig
+ ``Strand``: the strand encoding the protein
+ ``Phase``: protein initiation coding location
+ ``Product``: protein product
+ ``Function Prediction Source``: function annotation source
+ ``COG_category``: protein classification with COG category
+ ``Description``: protein description
+ ``Preferred_name``: protein preferred name
+ ``GOs``: protein annotation by GO database
+ ``EC``: protein annotation by EC number
+ ``KEGG_ko``: protein annotation by KEGG ko database
+ ``KEGG_Pathway``: protein annotation by KEGG Pathway database
+ ``KEGG_Module``: protein annotation by KEGG Module database
+ ``KEGG_Reaction``: protein annotation by KEGG Reaction database
+ ``KEGG_rclass``: protein annotation by KEGG rclass database
+ ``BRITE``: protein annotation by KEGG BRITE database
+ ``KEGG_TC``: protein annotation by KEGG TC database
+ ``CAZy``: protein annotation by CAZy database
+ ``BiGG_Reaction``: protein annotation by BiGG database
+ ``PFAMs``: protein annotation by Pfam database
+ ``Sequence``: protein sequence

#### tRNA & tmRNA meta data download
The metadata for all the **6,979,930** tRNAs & tmRNAs. The table columns represent the following:

+ ``Archaea_ID`` or ``Bacteria_ID`` or ``Fungi_ID`` or ``Viruses_ID``: archaea or bacteria or fungi or viruses ID
+ ``Contig_ID``: microbial sequence assembly contig ID
+ ``tRNA_ID``: tRNA or tmRNA ID
+ ``tRNA Type``: tRNA or tmRNA type
+ ``Start``: the tRNA or tmRNA start site on the contig
+ ``End``: the tRNA or tmRNA end site on the contig
+ ``Strand``: the strand encoding the tRNA or tmRNA
+ ``Length``: tRNA or tmRNA sequence
+ ``Sequence``: tRNA or tmRNA sequence

#### CRISPR/Cas System meta data download
The metadata for all the **18,966** CRISPR/Cas systems. The table columns represent the following:

+ ``Archaea_ID`` or ``Bacteria_ID`` or ``Fungi_ID`` or ``Viruses_ID``: archaea or bacteria or fungi or viruses ID
+ ``Contig_ID``: microbial sequence assembly contig ID
+ ``Cas_ID``: predicted Cas ID
+ ``Cas_start``: the Cas start site on the contig
+ ``Cas_end``: the Cas end site on the contig
+ ``Cas Subtype``: predicted Cas subtype
+ ``CRISPR_ID``: predicted CRISPR ID
+ ``CRISPR_start``: the CRISPR start site on the contig
+ ``CRISPR_end``: the CRISPR end site on the contig
+ ``CRISPR Subtype``: predicted CRISPR subtype
+ ``CRISPR-Cas Consenus Prediction``: prediction of CRISPR-Cas consenus
+ ``Consensus Repeat Sequence``: predicted CRISPR-Cas consenus repeat sequence
+ ``Cas Genes``: predicted Cas genes

#### Anti-CRISPR Protein meta data download
The metadata for all the **171,775** anti-CRISPR proteins. The table columns represent the following:

+ ``Archaea_ID`` or ``Bacteria_ID`` or ``Fungi_ID`` or ``Viruses_ID``: archaea or bacteria or fungi or viruses ID
+ ``Position``: identificated position of anti-CRISPR protein on contig
+ ``Contig_ID``: microbial sequence assembly contig ID
+ ``Protein_ID``: microbial annotated protein ID
+ ``Start``: the protein start site on the contig
+ ``End``: the protein end site on the contig
+ ``Classification``: confidence classification of identification
+ ``aa Length``: length of identified Acr/Aca
+ ``Acr/Aca``: identification for Acr/Aca
+ ``MGE/Prophage MetaData``: metadata for MGE/prophage
+ ``Acr_Hit|pident``: the pident of Acr hit
+ ``Sequence``: Acr/Aca sequence
+ ``Self Target w/in 5000 BP``: Acr-Aca locus has self-targeting spacer within 5,000 bp
+ ``Self Target Outside 5000 BP``: Acr-Aca locus has self-targeting spacer outside 5,000 bp

#### Secondary Metabolite meta data download
The metadata for all the **32,673** secondary metabolites. The table columns represent the following:

+ ``Archaea_ID`` or ``Bacteria_ID`` or ``Fungi_ID`` or ``Viruses_ID``: archaea or bacteria or fungi or viruses ID
+ ``Contig_ID``: microbial sequence assembly contig ID
+ ``Source``: secondary metabolites detection source
+ ``Region``: the region number for secondary metabolites
+ ``Start``: the secondary metabolites start site on the contig
+ ``End``: the secondary metabolites end site on the contig
+ ``Type``: detected secondary metabolites type
+ ``Most similar known cluster``: the most similar known cluster for detected secondary metabolites
+ ``Similarity``: similarity among detected secondary metabolites and known cluster

#### Signal Peptide meta data download
The metadata for all the **3,610,659** signal peptides. The table columns represent the following:

+ ``Archaea_ID`` or ``Bacteria_ID`` or ``Fungi_ID`` or ``Viruses_ID``: archaea or bacteria or fungi or viruses ID
+ ``Contig_ID``: microbial sequence assembly contig ID
+ ``Protein_ID``: microbial annotated protein ID
+ ``Source``: signal peptides prediction source
+ ``Prediction``: predicted signal peptides type
+ ``OTHER``: probability that the predicted signal peptide type is OTHER
+ ``SP(Sec/SPI)``: probability that the predicted signal peptide type is SP
+ ``LIPO(Sec/SPII)``: probability that the predicted signal peptide type is LIPO
+ ``TAT(Tat/SPI)``: probability that the predicted signal peptide type is TAT
+ ``TATLIPO(Tat/SPII)``: probability that the predicted signal peptide type is TATLIPO
+ ``PILIN(Sec/SPIII)``: probability that the predicted signal peptide type is PILIN
+ ``CS Position``: CS position
+ ``Probability of CS Position``: probability of CS position

#### Virulence factor meta data download
The metadata for all the **981,903** virulence factors (VF). The table columns for aechaea, bacteria and viruses represent the following:

+ ``Archaea_ID`` or ``Bacteria_ID`` or ``Fungi_ID`` or ``Viruses_ID``: archaea or bacteria or fungi or viruses ID
+ ``Contig_ID``: microbial sequence assembly contig ID
+ ``Protein_ID``: microbial annotated protein ID
+ ``VF Database``: reference database for aligned VF
+ ``VFSeq_ID``: protein ID for aligned VF in VFDB
+ ``Identity``: the identity of alignment
+ ``E-value``: the e-value of alignment
+ ``Gene_Name``: gene name for aligned VF in VFDB
+ ``Product``: protein product for aligned VF in VFDB
+ ``VFID``: VFID for aligned VF in VFDB
+ ``VF_Name``: VF name for aligned VF in VFDB
+ ``VF_FullName``: VF full name for aligned VF in VFDB
+ ``VFCID``: VFCID for aligned VF in VFDB
+ ``Vfcategory``: VF category for aligned VF in VFDB
+ ``Characteristics``: the characteristics of aligned VF in VFDB
+ ``Sequence``: the aligned VF sequence

The table columns for fungi represent the following:

+ ``Archaea_ID`` or ``Bacteria_ID`` or ``Fungi_ID`` or ``Viruses_ID``: archaea or bacteria or fungi or viruses ID
+ ``Contig_ID``: microbial sequence assembly contig ID
+ ``Protein_ID``: microbial annotated protein ID
+ ``VF Database``: reference database for aligned VF
+ ``UniProtID``: protein UniProt ID for aligned VF in DFVF
+ ``Identity``: the identity of alignment
+ ``E-value``: the e-value of alignment
+ ``Gene Symbol``: gene symbol for aligned VF in DFVF
+ ``Organism``: organism of aligned VF in VFDB
+ ``Taxonomy ID``: Taxonomy ID for organism of aligned VF
+ ``Disease-Host``: organism host of aligned VF in DFVF
+ ``Disease``: disease caused by organism host
+ ``DiseaseKey``: disease key caused by organism host
+ ``Sequence``: the aligned VF sequence

#### Antibiotic resistance gene meta data download
The metadata for all the **133,590,328** antibiotic resistance genes (ARG). The table columns represent the following:

+ ``Archaea_ID`` or ``Bacteria_ID`` or ``Fungi_ID`` or ``Viruses_ID``: archaea or bacteria or fungi or viruses ID
+ ``Contig_ID``: microbial sequence assembly contig ID
+ ``Protein_ID``: microbial annotated protein ID
+ ``ARG Database``: reference database for aligned ARG
+ ``Cut_Off``: RGI detection paradigm
+ ``HSP identifier``: the identifier of HSP
+ ``Best_Hit_ARO``: ARO term of top hit in CARD
+ ``Best_Identities``: percent identity of match to top hit in CARD
+ ``ARO``: ARO accession of match to top hit in CARD
+ ``Drug Class``: ARO categorization in CARD
+ ``Resistance Mechanism``: the resistance mechanism of aligned protein
+ ``AMR Gene Family``: the AMR gene family of aligned protein
+ ``Antibiotic``: the antibiotics of aligned protein
+ ``Sequence``: the aligned protein sequence

#### Transmembrane protein meta data download
The metadata for all the **28,088,540** transmembrane proteins. The table columns represent the following:

+ ``Archaea_ID`` or ``Bacteria_ID`` or ``Fungi_ID`` or ``Viruses_ID``: archaea or bacteria or fungi or viruses ID
+ ``Contig_ID``: microbial sequence assembly contig ID
+ ``Protein_ID``: microbial annotated protein ID
+ ``Length``: protein length
+ ``Number of predicted TMHs``: number of predicted transmembrane helices
+ ``Source``: transmembrane proteins prediction source
+ ``Position``: transmembrane helices position
+ ``start``: the transmembrane helices start site on the contig
+ ``end``: the transmembrane helices end site on the contig
+ ``Exp number of AAs in TMHs``: the expected number of amino acids intransmembrane helices
+ ``Exp number, first 60 AAs``: the expected number of amino acids in transmembrane helices in the first 60 amino acids of the protein
+ ``Total prob of N\-in``: the total probability that the N-term is on the cytoplasmic side of the membrane

